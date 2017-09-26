# pylint: disable=C0103
from __future__ import print_function, with_statement

import os

from fabric.api import (cd, env, hosts, local, parallel, path, prefix, roles,
                        run, settings, sudo, task)
from fabric.contrib import files

from pprint import pprint
from functools import wraps
from fabvenv import make_virtualenv, virtualenv

'''
This file is never called direcly
Use the command `fab`

If running this for the first time or without vietualenv:
pip3 install Fabric3  --user

# using file name and rules
fab -f fabfile.py -R staging deploy
# or just the task and the default fabfile.py:
fab -R staging deploy
'''

git_repo = "https://github.com/ricleal/sns-reduction.git"

# Fabric hangs without this
env.shell = "/bin/bash -c"

# This is the definitions for ever
env.roledefs = {
    'staging': {
        'hosts': ['vagrant@127.0.0.1:2222'],
        'project_root': '/home/vagrant/sns-reduction',
    },
    'production': {
        'hosts': ['rhf@reduction.sns.gov'],
        'project_root': '/var/www/sns-reduction',
    }
}

def get_active_role_name():
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
        # nginx
        'nginx_conf_template': os.path.join(
            local_project_root, 'config', 'deploy', 'nginx_staging_template.conf'),
        'nginx_conf_file': os.path.join(
            remote_project_root, 'dist', 'nginx', 'nginx.conf'),
        'nginx_service_template': os.path.join(
            local_project_root, 'config', 'deploy', 'nginx_template.service'),
        'nginx_service_file': os.path.join(
            remote_project_root, 'dist', 'nginx', 'nginx.service'),
        # uwsgi
        'uwsgi_ini_template': os.path.join(
            local_project_root, 'config', 'deploy', 'uwsgi_template.ini'),
        'uwsgi_ini_file': os.path.join(
            remote_project_root, 'dist', 'uwsgi', 'uwsgi.ini'),
        'uwsgi_service_template': os.path.join(
            local_project_root, 'config', 'deploy', 'uwsgi_template.service'),
        'uwsgi_service_file': os.path.join(
            remote_project_root, 'dist', 'uwsgi', 'uwsgi.service'),
        'uwsgi_params_template': os.path.join(
            local_project_root, 'config', 'deploy', 'uwsgi_params'),
        'uwsgi_params_file': os.path.join(
            remote_project_root, 'dist', 'uwsgi_params'),
        # Redis
        'redis_conf_template': os.path.join(
            local_project_root, 'config', 'deploy', 'redis_template.conf'),
        'redis_conf_file': os.path.join(
            remote_project_root, 'dist', 'redis', 'redis.conf'),
        'redis_service_template': os.path.join(
            local_project_root, 'config', 'deploy', 'redis_template.service'),
        'redis_service_file': os.path.join(
            remote_project_root, 'dist', 'redis', 'redis.service'),
        #
        'requirements_file': os.path.join(
            remote_project_root, 'config', 'requirements', 'production.txt'),
    }   

    if role_name == 'production':
        roles.update({
            'nginx_conf_template': os.path.join(
                local_project_root, 'config', 'deploy', 'nginx_production_template.conf'),
            'ssl_certificate_file': '/etc/ssl/certs/wildcard.sns.gov.crt',
            'ssl_certificate_key_file': '/etc/pki/tls/private/wildcard.sns.gov.key',
        })

    env.roledefs[role_name].update(roles)


def set_active_role_as_env(role_name):
    '''
    This sets the env.roledefs[<active role>] as env variable 
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
    Make sure all the role settings are available in the env 
    """
    @wraps(func)
    def wrapper(*args, **kwargs):
        role_name = get_active_role_name()
        append_to_active_role(role_name)
        set_active_role_as_env(role_name)
        return func(*args, **kwargs)
    return wrapper

###############################################################################
# Auxiliary functions for the tasks
#

###############################################################################
# TASKS
#

@task
@apply_role
def clone_or_pull():
    '''
    Clones or pull the repo
    Runs migrations
    '''
    if files.exists(env['project_root']):
        with cd(env['project_root']):
            # run("git pull origin master")
            run("git pull")
    else:
        run('git clone {} {}'.format(git_repo, env['project_root']))
    
    venv_root = os.path.join(env['project_root'], 'venv')
    src_root = os.path.join(env['project_root'], 'src')

    # Create Virtual env
    if not files.exists(venv_root):
        make_virtualenv(venv_root)
    with virtualenv(venv_root), cd(src_root):
        run("pip install -U -r %(requirements_file)s" % env)
        # Collect all the static files
        run('python manage.py collectstatic --noinput')
        # Migrate and Update the database
        run('python manage.py makemigrations --noinput')
        run('python manage.py migrate --no-input')
        run('python manage.py loaddata catalog jobs')

@task
@apply_role
def start_nginx():
    '''
    Start NGINX

    # Run as:
    fab -f fabfile.py -R staging start_nginx

    # To delete manualy this service:
    sudo systemctl stop reduction_nginx
    sudo systemctl disable reduction_nginx
    sudo rm /lib/systemd/system/reduction_nginx.service 
    sudo systemctl daemon-reload
    sudo systemctl reset-failed

    # To list this service
    systemctl list-unit-files --all | grep nginx

    '''
    files.upload_template(env['nginx_conf_template'],
        env['nginx_conf_file'], context=env)
    files.upload_template(env['nginx_service_template'],
        env['nginx_service_file'], context=env)
    
    sudo('ln -f -s {} {}'.format(
        env['nginx_service_file'],
        '/usr/lib/systemd/system/reduction_nginx.service'))

    # This is to enable on boot
    # sudo('systemctl enable reduction_nginx.service')
    sudo('systemctl daemon-reload')
    sudo('systemctl start reduction_nginx.service')

@task
@apply_role
def start_uwsgi():
    '''
    Start uwsgi

    # Run as:
    fab -f fabfile.py -R staging start_uwsgi

    # To delete manualy this service:
    sudo systemctl stop reduction_uwsgi
    sudo systemctl disable reduction_uwsgi
    sudo rm /lib/systemd/system/reduction_uwsgi.service 
    sudo systemctl daemon-reload
    sudo systemctl reset-failed

    # To list this service
    systemctl list-unit-files --all | grep uwsgi

    '''
    files.upload_template(env['uwsgi_params_template'],
        env['uwsgi_params_file'], context=env)
    files.upload_template(env['uwsgi_ini_template'],
        env['uwsgi_ini_file'], context=env)
    files.upload_template(env['uwsgi_service_template'],
        env['uwsgi_service_file'], context=env)
    
    sudo('ln -f -s {} {}'.format(
        env['uwsgi_service_file'],
        '/usr/lib/systemd/system/reduction_uwsgi.service'))

    # This is to enable on boot
    # sudo('systemctl enable reduction_uwsgi.service')
    sudo('systemctl daemon-reload')
    sudo('systemctl start reduction_uwsgi.service')

@task
@apply_role
def start_redis():
    '''
    
    # To delete manualy this service:
    sudo systemctl stop reduction_redis
    sudo systemctl disable reduction_redis
    sudo rm /lib/systemd/system/reduction_redis.service 
    sudo systemctl daemon-reload
    sudo systemctl reset-failed
    '''
    files.upload_template(env['redis_conf_template'],
        env['redis_conf_file'], context=env)
    files.upload_template(env['redis_service_template'],
        env['redis_service_file'], context=env)
    
    sudo('ln -f -s {} {}'.format(
        env['redis_service_file'],
        '/usr/lib/systemd/system/reduction_redis.service'))
    
    #sudo('systemctl enable reduction_redis.service')
    sudo('systemctl daemon-reload')
    sudo('systemctl start reduction_redis.service')


    

# def deploy():
#     venv_root = os.path.join(env['project_root'], 'venv')
#     src_root = os.path.join(env['project_root'], 'src')

#     # Create Virtual env
#     if not os.path.isdir(venv_root):
#         with cd(env['project_root']):
#             run('virtualenv venv')

#     # Activate the environment and install requirements
#     with settings(warn_only=True), prefix('. ' + venv_root + '/bin/activate'):
#         run("pip install -U -r %(requirements_file)s"%env)

#     with cd(src_root), prefix('. ' + venv_root + '/bin/activate'):
#         # Collect all the static files
#         run('python manage.py collectstatic --noinput')
#         # Migrate and Update the database
#         run('python manage.py makemigrations --noinput')
#         run('python manage.py migrate --no-input')
#         run('python manage.py migrate --no-input')
#         run('python manage.py loaddata catalog jobs')

#     # Fills in the templates
#     files.upload_template(env['nginx_conf_template'], env['nginx_conf_file'], context=env)
#     files.upload_template(env['uwsgi_ini_template'], env['uwsgi_ini_file'], context=env)
#     files.upload_template(env['redis_conf_template'], env['redis_conf_file'], context=env)

#     with prefix('. ' + venv_root + '/bin/activate'), settings(warn_only=True):
#         run("killall -w -q -s INT $(which uwsgi)")
#         run("$(which uwsgi) --ini %(uwsgi_ini_file)s"%env)

#     with settings(warn_only=True):
#         run("killall -w -q -s INT $(which redis-server)")
#     run_background("$(which redis-server) %(redis_conf_file)s"%env)

#     with cd(src_root), prefix('. ' + venv_root + '/bin/activate'), settings(warn_only=True):
#         run("kill -9 $(ps -ef  | grep $(which celery) | grep -v grep | tr -s ' ' | cut -d ' ' -f 2)")
#         run_background("$(which celery) -A server.celery worker --loglevel=info --logfile=%(project_root)s/dist/celery.log"%env)
    
    

# #
# # Tasks
# #

# @task
# def cleandb():
#     local('psql -U reduction -d reduction -c "drop owned by reduction;" && find . -iname "$????_*.py*" | grep migrations | xargs rm')
    
# @task
# @roles('dev')
# def killall():
#     update_env()
#     venv_root = os.path.join(env['project_root'], 'venv')
#     with prefix('. ' + venv_root + '/bin/activate'), settings(warn_only=True):
#         run("kill -9 $(ps -ef  | grep $(which celery) | grep -v grep | tr -s ' ' | cut -d ' ' -f 2)")
#         run("killall -w -q -s INT $(which redis-server)")
#         run("killall -w -q -s INT $(which uwsgi)")
#         run("killall -w -q -s INT $(which nginx)")
#         #run("ps -e | grep -e $(which celery) -e $(which redis-server) -e $(which uwsgi) -e $(which nginx)")
#         run("ps -ef | grep -e celery -e redis-server -e uwsgi -e nginx")
# @task
# @roles('dev')
# def deploy_dev():
#     update_env()
#     deploy()
#     restart_nginx()
#     run("ps -e | grep -e celery -e redis-server -e uwsgi -e nginx")

# @task
# @roles('dev_ssl')
# def deploy_dev_ssl():
#     update_env()
#     deploy()
#     restart_nginx(run_as_sudo=True)

# @task
# @roles('staging')
# def deploy_staging():
#     print("TODO")
#     pass

# @task
# @roles('production')
# def deploy_prod():
#     print("TODO")
#     pass



