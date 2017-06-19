# pylint: disable-msg=C0103

from __future__ import print_function, with_statement

'''
This file is never called direcly
Use the command `fab`

If running this for the first time or without vietualenv:
pip3 install Fabric3  --user

# using file name and rules
fab -f fabfile.py -R dev deploy_dev
# or just the task and the default fabfile.py:
fab deploy_dev
'''

import os

from fabric.api import (
    task, run, env, local, path, prefix, cd,
    hosts, roles, parallel, settings, sudo
)
from fabric.contrib import files
from contextlib import contextmanager as _contextmanager

# Fabric hangs without this
env.shell = "/bin/bash -c"

###############################################################################
# Roles
#
env.roledefs = {
    'dev': {
        'hosts': ['localhost'],
        'user': 'rhf',
        'project_root': os.path.dirname(os.path.realpath(__file__)),
    },
    'dev-ssl': {
        'hosts': ['lealpc.ornl.gov'],
        'user': 'rhf',
        'project_root': os.path.dirname(os.path.realpath(__file__)),
    },
    'pre-prod': {
        'hosts': ['pc83734.ornl.gov'],
        'user': 'rhf',
        'project_root': os.path.dirname(os.path.realpath(__file__)),
    },
    'prod': {
        'hosts': ['reduction.sns.gov'],
        'user': 'rhf',
        'project_root': os.path.dirname(os.path.realpath(__file__)),
    }
}

###############################################################################
# dev
#
dev_roles = {
    # virtual env:
    'venv_root': os.path.join(
        env.roledefs['dev']['project_root'], 'venv'
    ),
    # requirements
    'requirements_file': os.path.join(
        env.roledefs['dev']['project_root'], 'config', 'requirements', 'dev.txt'
    ),
}
env.roledefs['dev'].update(dev_roles)

###############################################################################
# dev-ssl
#
dev_ssl_roles = dev_roles
dev_ssl_roles.update({
    # Certificates
    'ssl_certificate_file': os.path.join(
        env.roledefs['dev-ssl']['project_root'], 'config', 'certificates', 'domain.crt'
    ),
    'ssl_certificate_key_file': os.path.join(
        env.roledefs['dev-ssl']['project_root'], 'config', 'certificates', 'domain.key'
    ),
    # NGINX
    'nginx_conf_template': os.path.join(
        env.roledefs['dev-ssl']['project_root'], 'config', 'deploy', 'nginx_dev-ssl_template.conf'
    ),
    'nginx_conf_file': os.path.join(
        env.roledefs['dev']['project_root'], 'dist', 'nginx.conf'
    ),
    'nginx_systemd_template': os.path.join(
        env.roledefs['dev-ssl']['project_root'], 'config', 'deploy', 'nginx_template.service'
    ),
    'nginx_systemd_file': '/etc/systemd/system/nginx.service',
    # uWSGI
    'uwsgi_ini_template': os.path.join(
        env.roledefs['dev']['project_root'], 'config', 'deploy', 'uwsgi_dev-ssl_template.ini'
    ),
    'uwsgi_ini_file': os.path.join(
        env.roledefs['dev']['project_root'], 'dist', 'uwsgi.ini'
    ),
    'uwsgi_systemd_template': os.path.join(
        env.roledefs['dev-ssl']['project_root'], 'config', 'deploy', 'uwsgi_template.service'
    ),
    'uwsgi_systemd_file': '/etc/systemd/system/uwsgi.service',
    # Redis
    'redis_conf_template': os.path.join(
        env.roledefs['dev-ssl']['project_root'], 'config', 'deploy', 'redis_dev-ssl_template.conf'
    ),
    'redis_conf_file': os.path.join(
        env.roledefs['dev']['project_root'], 'dist', 'redis.conf'
    ),
    'redis_systemd_template': os.path.join(
        env.roledefs['dev-ssl']['project_root'], 'config', 'deploy', 'redis_template.service'
    ),
    'redis_systemd_file': '/etc/systemd/system/redis.service',

})
env.roledefs['dev-ssl'].update(dev_ssl_roles)

###############################################################################
# pre-prod
#
pre_prod_roles = dev_ssl_roles
# pre_prod_roles.update({
# })
env.roledefs['pre-prod'].update(pre_prod_roles)

###############################################################################
# prod
#
prod_roles = pre_prod_roles
prod_roles.update({
    'ssl_certificate_file': '/etc/ssl/certs/wildcard.sns.gov.crt',
    'ssl_certificate_key_file': '/etc/pki/tls/private/wildcard.sns.gov.key',
    'requirements_file': os.path.join(
        env.roledefs['dev']['project_root'], 'config', 'requirements', 'prod.txt'
    ),
})
env.roledefs['prod'].update(prod_roles)

###############################################################################
# Virtual Env
#

@_contextmanager
def virtualenv():
    '''
    Use as:
    with virtualenv():
        .....
    '''
    with cd(env['venv_root']):
        with prefix('source ' + os.path.join(env['venv_root'], 'bin', 'activate')):
            yield


#
def update_env():
    '''
    If we want to use:
    env.roledefs
    This must be called. It makes available all the variables above
    '''
    context = env.roledefs[env.effective_roles[0]]
    env.update(context)
#     from pprint import pprint
#     pprint(env)


##
#
def start_redis_as_service():
    files.upload_template(env['redis_conf_template'], env['redis_conf_file'], context=env)
    files.upload_template(env['redis_systemd_template'], env['redis_systemd_file'], context=env, use_sudo=True)
    sudo("$(which systemctl) start redis")


def start_nginx_as_service():
    files.upload_template(env['nginx_conf_template'], env['nginx_conf_file'], context=env)
    files.upload_template(env['nginx_systemd_template'], env['nginx_systemd_file'], context=env, use_sudo=True)
    sudo("$(which systemctl) start nginx")


def start_uwsgi_as_service():
    files.upload_template(env['uwsgi_ini_template'], env['uwsgi_ini_file'], context=env)
    files.upload_template(env['uwsgi_systemd_template'], env['uwsgi_systemd_file'], context=env, use_sudo=True)
    sudo("$(which systemctl) start uwsgi")



#
# Aux functions
#
def run_background(command, run_as_sudo=False):
    '''
    Rus remote command in the background
    '''
    full_command = "set -m; nohup %s >& /dev/null < /dev/null &"%command
    if run_as_sudo:
        sudo(full_command, pty=False)
    else:
        run(full_command, pty=False)


def launch_in_terminal(command):
    local("gnome-terminal -e 'bash -c \"" + command + "\"'")

#
# Main Functions
#

def restart_nginx(run_as_sudo=False):
    '''
    Re-Start nginx
    If using port 80 needs to run as Root
    '''
    with settings(warn_only=True):
        command = "killall -w -q -s INT $(which nginx)"
        if run_as_sudo:
            sudo(command)
        else:
            run(command)
    run_background("nginx -c %(nginx_conf_file)s -g 'daemon off;'" % env, run_as_sudo)

def update_env():
    context = env.roledefs[env.effective_roles[0]]
    env.update(context)
#     from pprint import pprint
#     pprint(env)



def deploy():
    venv_root = os.path.join(env['project_root'], 'venv')
    src_root = os.path.join(env['project_root'], 'src')

    # Create Virtual env
    if not os.path.isdir(venv_root):
        with cd(env['project_root']):
            run('virtualenv venv')

    # Activate the environment and install requirements
    with settings(warn_only=True), prefix('. ' + venv_root + '/bin/activate'):
        run("pip install -U -r %(requirements_file)s"%env)

    with cd(src_root), prefix('. ' + venv_root + '/bin/activate'):
        # Collect all the static files
        run('python manage.py collectstatic --noinput')
        # Migrate and Update the database
        run('python manage.py makemigrations --noinput')
        run('python manage.py migrate --no-input')
        run('python manage.py migrate --no-input')
        run('python manage.py loaddata catalog jobs')

    # Fills in the templates
    files.upload_template(env['nginx_conf_template'], env['nginx_conf_file'], context=env)
    files.upload_template(env['uwsgi_ini_template'], env['uwsgi_ini_file'], context=env)
    files.upload_template(env['redis_conf_template'], env['redis_conf_file'], context=env)

    with prefix('. ' + venv_root + '/bin/activate'), settings(warn_only=True):
        run("killall -w -q -s INT $(which uwsgi)")
        run("$(which uwsgi) --ini %(uwsgi_ini_file)s"%env)

    with settings(warn_only=True):
        run("killall -w -q -s INT $(which redis-server)")
    run_background("$(which redis-server) %(redis_conf_file)s"%env)

    with cd(src_root), prefix('. ' + venv_root + '/bin/activate'), settings(warn_only=True):
        run("kill -9 $(ps -ef  | grep $(which celery) | grep -v grep | tr -s ' ' | cut -d ' ' -f 2)")
        run_background("$(which celery) -A server.celery worker --loglevel=info --logfile=%(project_root)s/dist/celery.log"%env)


#
# Tasks
#
@task
@roles('dev-ssl')
def debug():
    update_env()
    with virtualenv():
        run('pip freeze')
    # start_redis_as_service()
    start_nginx_as_service()
    start_uwsgi_as_service()
    



@task
def cleandb():
    local('psql -U reduction -d reduction -c "drop owned by reduction;" && find . -iname "$????_*.py*" | grep migrations | xargs rm')


@task
@roles('dev')
def killall():
    update_env()
    venv_root = os.path.join(env['project_root'], 'venv')
    with prefix('. ' + venv_root + '/bin/activate'), settings(warn_only=True):
        run("kill -9 $(ps -ef  | grep $(which celery) | grep -v grep | tr -s ' ' | cut -d ' ' -f 2)")
        run("killall -w -q -s INT $(which redis-server)")
        run("killall -w -q -s INT $(which uwsgi)")
        run("killall -w -q -s INT $(which nginx)")
        #run("ps -e | grep -e $(which celery) -e $(which redis-server) -e $(which uwsgi) -e $(which nginx)")
        run("ps -ef | grep -e celery -e redis-server -e uwsgi -e nginx")


@task
@roles('dev')
def deploy_dev():
    update_env()
    deploy()
    restart_nginx()
    run("ps -e | grep -e celery -e redis-server -e uwsgi -e nginx")


@task
@roles('dev-ssl')
def deploy_dev_ssl():
    update_env()
    deploy()
    restart_nginx(run_as_sudo=True)


@task
@roles('pre-prod')
def deploy_pre_prod():
    print("TODO")
    pass


@task
@roles('prod')
def deploy_prod():
    print("TODO")
    pass