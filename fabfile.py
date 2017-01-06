'''
This file is never called direcly
Use the command `fab`

If running this for the first time or without vietualenv:
pip3 install Fabric3  --user

fab -f fabfile_back2.py -R dev deploy_dev

'''
from __future__ import print_function, with_statement

from fabric.api import task, run, env, local, path, prefix, cd, hosts, roles, parallel, settings, sudo
from fabric.contrib import files
import os
import time

# Fabric hangs without this
env.shell = "/bin/bash -c"

env.roledefs = {
    'dev': {
        'hosts': ['localhost'],
        'user': 'rhf',
        'project_root': '/home/rhf/git/sns-reduction',
    },
    'dev_ssl': {
        'hosts': ['localhost'],
        'user': 'rhf',
        'project_root': '/home/rhf/git/sns-reduction',
    },
    'staging': {
        'hosts': ['pc83734.ornl.gov'],
        'user': 'rhf',
        'project_root': '/home/rhf/git/sns-reduction',
    },
    'production': {
        'hosts': ['reduction.sns.gov'],
        'user': 'rhf',
        'project_root': '/var/www/sns-reduction',
    }
}

# Dev
env.roledefs['dev'].update({'nginx_conf_template' : os.path.join(env.roledefs['dev']['project_root'], 'config', 'deploy', 'nginx_dev_template.conf' ) })
env.roledefs['dev'].update({'nginx_conf_file' : os.path.join(env.roledefs['dev']['project_root'], 'dist', 'nginx.conf' ) })
env.roledefs['dev'].update({'uwsgi_ini_template' : os.path.join(env.roledefs['dev']['project_root'], 'config', 'deploy', 'uwsgi_template.ini' ) })
env.roledefs['dev'].update({'uwsgi_ini_file' : os.path.join(env.roledefs['dev']['project_root'], 'dist', 'uwsgi.ini' ) })
env.roledefs['dev'].update({'requirements_file' : os.path.join(env.roledefs['dev']['project_root'], 'requirements.txt' ) })
# Dev_SSL
env.roledefs['dev_ssl'].update(env.roledefs['dev'])
env.roledefs['dev_ssl'].update({'nginx_conf_template' : os.path.join(env.roledefs['dev']['project_root'], 'config', 'deploy', 'nginx_staging_template.conf' ) })

# Staging
env.roledefs['staging'].update(env.roledefs['dev_ssl'])

# Production
env.roledefs['production'].update(env.roledefs['staging'])
env.roledefs['production'].update({'ssl_certificate_file' : '/etc/ssl/certs/wildcard.sns.gov.crt'})
env.roledefs['production'].update({'ssl_certificate_key_file' : '/etc/pki/tls/private/wildcard.sns.gov.key'})

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

#
# Main Functions
#

def restart_nginx(run_as_sudo=False):
    # Start nginx
    with settings(warn_only=True):
        command = "killall -w -q -s INT $(which nginx)"
        if run_as_sudo:
            sudo(command)
        else:
            run(command)
    run_background("nginx -c %(nginx_conf_file)s -g 'daemon off;'"%env, run_as_sudo)

def update_env():
    context = env.roledefs[env.effective_roles[0]]
    env.update(context)
    from pprint import pprint
    pprint(env)


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
        run('python manage.py loaddata catalog')

    # Fills in the templates
    files.upload_template(env['nginx_conf_template'], env['nginx_conf_file'], context=env)
    files.upload_template(env['uwsgi_ini_template'], env['uwsgi_ini_file'], context=env)

    with prefix('. ' + venv_root + '/bin/activate'), settings(warn_only=True):
        run("killall -w -q -s INT $(which uwsgi)")
        run_background("uwsgi --ini %(uwsgi_ini_file)s"%env)


#
# Tasks
#
@task
@roles('dev')
def deploy_dev():
    update_env()
    deploy()
    restart_nginx()

@task
@roles('dev_ssl')
def deploy_dev_ssl():
    update_env()
    deploy()
    restart_nginx(run_as_sudo=True)

@task
@roles('staging')
def deploy_staging():
    pass

@task
@roles('production')
def deploy_prod():
    pass