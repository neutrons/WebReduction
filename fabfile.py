'''
This file is never called direcly
Use the command `fab`

If running this for the first time or without vietualenv:
pip3 install Fabric3 python-dotenv --user

'''

from fabric.api import task, run, env, local, path, prefix, cd
import os

@task
def dev():
    env.user = 'rhf'
    env.hosts = ['lealpc.ornl.gov']

@task
def staging():
    env.user = 'rhf'
    env.hosts = ['pc83734.ornl.gov']

@task
def prod():
    env.user = 'rhf'
    env.hosts = ['reduction.sns.gov']

# settings.py

PROJECT_ROOT = os.path.dirname(os.path.realpath(__file__))
DIST_ROOT = os.path.join(PROJECT_ROOT, 'dist')
VENV_ROOT =  os.path.join(PROJECT_ROOT, 'venv')
SRC_ROOT =  os.path.join(PROJECT_ROOT, 'src')


def prepare_deploy(branch='master'):
    '''
    Run for example as: fab prepare_deploy:de
    '''
    assert(branch in ['master','dev'])
    local("git checkout %s"%branch)
    local("git pull origin %s"%branch)

@task
def deploy():
    # Create a directory on a remote server, if it doesn't already exists
    if not os.path.isdir(DIST_ROOT):
        run('mkdir -p %s'%DIST_ROOT)

    # Create a virtualenv, if it doesn't already exists
    if not os.path.isdir(VENV_ROOT):
        with cd(PROJECT_ROOT):
            run('virtualenv venv')

    # Activate the environment and install requirements
    with prefix('. ' + VENV_ROOT + '/bin/activate'):
        run('pip install -U -r requirements.txt')

    with cd(SRC_ROOT), prefix('. ' + VENV_ROOT + '/bin/activate'):
        # Collect all the static files
        run('python manage.py collectstatic --noinput')

        # Migrate and Update the database
        run('python manage.py makemigrations --noinput')
        run('python manage.py migrate --no-input')
        run('python manage.py migrate --no-input')
        run('python manage.py loaddata catalog')

    
    # uwsgi --ini config/deploy/uwsgi_dev.ini
    # /usr/sbin/nginx -c $(pwd)/config/deploy/nginx_dev.conf -g 'daemon off;'