# pylint: disable=C0103
from __future__ import print_function, with_statement

import os

from fabric.api import (cd, env, hosts, local, parallel, path, prefix, roles,
                        run, settings, sudo, task)
from fabric.contrib import files

from pprint import pprint
from functools import wraps

'''
This file is never called direcly
Use the command `fab`

If running this for the first time or without vietualenv:
pip3 install Fabric3  --user

# using file name and rules
fab -f fabfile.py -R dev deploy
# Passing the parameter 'branch' in function start 'start'
fab -f fabfile.py -R dev start:branch='dev_deploy'
# or just the task and the default fabfile.py:
fab -R dev deploy
'''

git_repo = "https://github.com/ricleal/sns-reduction.git"

# Fabric hangs without this
env.shell = "/bin/bash -c"

# This is the definitions for ever
env.roledefs = {
    'dev': {
        'hosts': ['reductiondev.sns.gov'],
        'project_root': '/usr/local/reduction',
    },
    'production': {
        'hosts': ['rhf@reduction.sns.gov'],
        'project_root': '/usr/local/reduction',
    }
}

def get_active_role_name():
    '''
    Get active role name. For example:
    If in the command line:
    $ fab -R dev start_celery
    The active role is dev
    If the in the function heder there's a decorator:
    @roles('webserver', 'dbserver')
    The active roles is an array: ['webserver', 'dbserver']
    and are treated one at the time
    '''
    # I think both instruction are equivalent:
    #for role in env.effective_roles:
    for role in env.roledefs.keys():
        if env.host_string in env.roledefs[role]['hosts']:
            return role


def append_to_active_role(role_name):
    '''
    Here goes the definitions for every role!
    '''
    remote_project_root = env.roledefs[role_name]['project_root']
    local_project_root = os.path.dirname(os.path.realpath(__file__))
    roles = {
        # project directories
        'project_src': os.path.join(remote_project_root, 'src'),
        'project_venv': os.path.join(remote_project_root, 'venv'),
        # nginx
        'nginx_conf_template': os.path.join(
            local_project_root, 'config', 'deploy', 'nginx_template.conf'),
        'nginx_conf_file': '/etc/nginx/nginx.conf',
        'nginx_service_template': os.path.join(
            local_project_root, 'config', 'deploy', 'nginx_template.service'),
        'nginx_service_file': '/etc/systemd/system/nginx.service',
        # Redis
        'redis_conf_template': os.path.join(
            local_project_root, 'config', 'deploy', 'redis_template.conf'),
        'redis_conf_file': '/etc/redis.conf',
        'redis_service_template': os.path.join(
            local_project_root, 'config', 'deploy', 'redis_template.service'),
        'redis_service_file': '/usr/lib/systemd/system/redis.service',
        # Celery
        'celery_conf_template': os.path.join(
            local_project_root, 'config', 'deploy', 'celery_template.conf'),
        'celery_conf_file': '/etc/celery.conf',
        'celery_service_template': os.path.join(
            local_project_root, 'config', 'deploy', 'celery_template.service'),
        'celery_service_file': '/usr/lib/systemd/system/celery.service',
        # Daphne
        'daphne_service_template': os.path.join(
            local_project_root, 'config', 'deploy', 'daphne_template.service'),
        'daphne_service_file': '/usr/lib/systemd/system/daphne@.service',
        'daphne_socket_template': os.path.join(
            local_project_root, 'config', 'deploy', 'daphne_template.socket'),
        'daphne_socket_file': '/usr/lib/systemd/system/daphne@.socket',
        # uWSGI
        'uwsgi_ini_template': os.path.join(
            local_project_root, 'config', 'deploy', 'uwsgi_template.ini'),
        'uwsgi_ini_file': '/etc/uwsgi.ini',
        'uwsgi_service_template': os.path.join(
            local_project_root, 'config', 'deploy', 'uwsgi_template.service'),
        'uwsgi_service_file': '/etc/systemd/system/uwsgi.service',
        # Requirements
        'requirements_file': os.path.join(
            remote_project_root, 'config', 'requirements', 'production.txt'),
        # Certificates:
        'ssl_certificate_file': '/etc/pki/tls/certs/wildcard.sns.gov.crt',
        'ssl_certificate_key_file': '/etc/pki/tls/private/wildcard.sns.gov.key',
    }
    # In this case they are the same, but most of the times they are not!
    if role_name == 'production':
        roles.update({
            'ssl_certificate_file': '/etc/pki/tls/certs/wildcard.sns.gov.crt',
            'ssl_certificate_key_file': ' /etc/pki/tls/private/wildcard.sns.gov.key',
        })

    env.roledefs[role_name].update(roles)


def set_active_role_as_env(role_name):
    '''
    This sets the env.roledefs[<active role>] as env variable
    E.g.:
    The entry:
    env.roledefs['dev']['project_root']
    Will be
    env.project_root
    When the 'dev' role is active
    '''
    for k, v in env.roledefs[role_name].items():
        if k in env and isinstance(env[k], list) and isinstance(v, list):
            env[k].extend(v)
        elif k in env and isinstance(env[k], list):
            env[k].append(v)
        else:
            env[k] = v


def apply_role(func):
    """
    Decorator
    Make sure all the active role settings are available in the env
    """
    @wraps(func)
    def wrapper(*args, **kwargs):
        role_name = get_active_role_name()
        append_to_active_role(role_name)
        set_active_role_as_env(role_name)
        return func(*args, **kwargs)
    return wrapper

###############################################################################
# TASKS
# By order of execution
# Do: fab --list
# To see what is available as tasks
@task
@apply_role
def start(branch='master'):
    '''
    Clones or pull the repo into the project root
    Creates reduction group
    Sets the virtual env

    # Run as:
    fab -R dev start:branch='dev_deploy'

    '''

    login = run('id -u -n')
    # gid = run('id -g')

    # creates a group reduction for all the users running this and web
    # related users
    with settings(warn_only=True):
        sudo('groupadd reduction')
        sudo('usermod -a -G reduction {}'.format(login))
        sudo('usermod -a -G reduction uwsgi')
        sudo('usermod -a -G reduction nginx')

    # clone the repo. Sets permissions to the group reduction
    if not files.exists(env.project_root):
        sudo('mkdir -p {}'.format(env.project_root))
        sudo('chown {}:{} {}'.format(
              login, 'reduction', env.project_root))
        # sudo('chmod 770 {}'.format(env.project_root))
        run('umask 007')
        run('git clone {} {}'.format(git_repo, env.project_root))
    else:
        with cd(env.project_root):
            run("git pull origin {}".format(branch))

    # VirtualEnv: ./venv set with persmissions of who runs the script
    if not files.exists(env.project_venv) or \
            not files.exists(os.path.join(env.project_venv, 'bin')):
        run('virtualenv {} -p $(which python3.5)'.format(env.project_venv))
        # Upgrade PIP
        with prefix('. ' + env.project_venv + '/bin/activate'):
            run("pip install pip -U")

    # Activate the environment and install requirements
    with prefix('. ' + env.project_venv + '/bin/activate'):
        run("pip install -r {}".format(env.requirements_file))

    # run('chmod -R u+rwX,g+rwX,o-rwX {}'.format(env.project_root))


@task
@apply_role
def clean_db(db_username='reduction'):
    '''
    deletes migrations and cleans the db.
    It asks for the
    Run for example as:
    fab -R dev clean_db:db_username='reduction'
    '''
    with  cd(env.project_root):
        run('find . -regextype sed -regex ".*migrations/[0-9]\{4\}_.*py" | xargs --no-run-if-empty rm')
        run('psql -U {} -d reduction -c "drop owned by reduction;"'.format(db_username))

@task
@apply_role
def pull_from_branch(branch='master'):
    '''
    Run for example as:
    fab -R dev pull_from_branch:branch='dev'
    '''
    with cd(env.project_root):
        run("git fetch -p")
        run("git clean -f") # remove untracked files
        run("git checkout {}".format(branch))
        run("git pull origin {}".format(branch))


@task
@apply_role
def migrate():
    '''
    Make the Django migrations and load fixtures
    ATTENTION: Don't forget to put the .env in the project root!!!
    and do: sudo chmod u=rw,g=rw,o= .env

    Run for example as clean_db followed by migration:
    fab -R dev clean_db pull_from_branch:branch='master' migrate

    '''
    with  prefix('. ' + env.project_venv + '/bin/activate'),\
            cd(env.project_src):
        # Collect all the static files
        run('python manage.py collectstatic --noinput')
        # Migrate and Update the database
        run('python manage.py makemigrations --noinput')
        run('python manage.py migrate --no-input')
        run('python manage.py loaddata catalog jobs')

@task
@apply_role
def start_daphne():
    '''
    Start daphne

    # Run as:
    fab -f fabfile.py -R dev start_nginx start_daphne
    # or
    fab -f fabfile.py -R dev start_daphne

    # To delete manualy this service:
    sudo systemctl stop daphne
    sudo systemctl disable daphne
    sudo rm /lib/systemd/system/daphne.service
    sudo systemctl daemon-reload
    sudo systemctl reset-failed

    # To list this service
    systemctl list-unit-files --all | grep daphne

    Note:
    This was done for multiprocessing. Unfortunetly it only works for ubuntu
    systemd v 229. RHEL 7.5 has v 219 and it does not allow to launch multiple
    sockets in the same port.. Looks like ReusePort is ignored.
    '''
    with settings(warn_only=True):
        files.upload_template(env['daphne_service_template'],
            env['daphne_service_file'], context=env, backup=False, use_sudo=True)
        files.upload_template(env['daphne_socket_template'],
            env['daphne_socket_file'], context=env, backup=False, use_sudo=True)

        sudo('systemctl daemon-reload')
        # Note the number of processes beeig launched
        # sudo('systemctl enable daphne@{1..2}.socket')
        # sudo('systemctl restart daphne@{1..2}.socket')
        sudo('systemctl enable daphne@1.socket')
        sudo('systemctl restart daphne@1.socket')

@task
@apply_role
def start_nginx():
    '''
    Start NGINX

    # Run as:
    fab -f fabfile.py -R dev start_nginx

    # To delete manualy this service:
    sudo systemctl stop nginx
    sudo systemctl disable nginx
    sudo rm /lib/systemd/system/nginx.service
    sudo systemctl daemon-reload
    sudo systemctl reset-failed

    # To list this service
    systemctl list-unit-files --all | grep nginx

    '''
    with settings(warn_only=True):
        files.upload_template(env['nginx_conf_template'],
            env['nginx_conf_file'], context=env, backup=False, use_sudo=True)
        files.upload_template(env['nginx_service_template'],
            env['nginx_service_file'], context=env, backup=False, use_sudo=True)


        sudo('systemctl daemon-reload')
        # This is to enable on boot
        sudo('systemctl enable nginx.service')
        sudo('systemctl restart nginx.service')

@task
@apply_role
def start_redis():
    '''
    Start Redis Server

    # To delete manualy this service:
    sudo systemctl stop redis
    sudo systemctl disable redis
    sudo rm /lib/systemd/system/redis.service
    sudo systemctl daemon-reload
    sudo systemctl reset-failed
    '''
    with settings(warn_only=True):
        files.upload_template(env['redis_conf_template'],
            env['redis_conf_file'], context=env, backup=False, use_sudo=True)
        files.upload_template(env['redis_service_template'],
            env['redis_service_file'], context=env, backup=False, use_sudo=True)

        sudo('systemctl daemon-reload')
        sudo('systemctl enable redis.service')
        sudo('systemctl restart redis.service')



@task
@apply_role
def start_celery():
    '''
    Start Celery

    # To delete manualy this service:
    sudo systemctl stop celery
    sudo systemctl disable celery
    sudo rm /lib/systemd/system/celery.service
    sudo systemctl daemon-reload
    sudo systemctl reset-failed
    '''

    with settings(warn_only=True):
        files.upload_template(env['celery_conf_template'],
            env['celery_conf_file'], context=env, backup=False, use_sudo=True)
        files.upload_template(env['celery_service_template'],
            env['celery_service_file'], context=env, backup=False, use_sudo=True)

        sudo('systemctl daemon-reload')
        sudo('systemctl enable celery.service')
        sudo('systemctl restart celery.service')



@task
@apply_role
def start_uwsgi():
    '''

    THIS IS NOT USED!!!

    Start uWSGI

    # Run as:
    fab -f fabfile.py -R dev start_uwsgi

    # Usually this is run as:
    fab -R dev clean_db pull_from_branch:branch='master' migrate

    # To delete manualy this service:
    sudo systemctl stop uwsgi
    sudo systemctl disable uwsgi
    sudo rm /lib/systemd/system/uwsgi.service
    sudo systemctl daemon-reload
    sudo systemctl reset-failed

    # To list this service
    systemctl list-unit-files --all | grep uwsgi

    '''
    with settings(warn_only=True):
        files.upload_template(env['uwsgi_ini_template'],
            env['uwsgi_ini_file'], context=env, backup=False, use_sudo=True)
        files.upload_template(env['uwsgi_service_template'],
            env['uwsgi_service_file'], context=env, backup=False, use_sudo=True)


        sudo('systemctl daemon-reload')
        # This is to enable on boot
        sudo('systemctl enable uwsgi.service')
        sudo('systemctl restart uwsgi.service')