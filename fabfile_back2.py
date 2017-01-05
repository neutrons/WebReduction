'''
This file is never called direcly
Use the command `fab`

If running this for the first time or without vietualenv:
pip3 install Fabric3 python-dotenv --user

'''

from fabric.api import task, run, env, local, path, prefix, cd, hosts, roles
import os

env.roledefs = {
    'dev': {
        'hosts': ['lealpc.orn.gov'],
        'user': 'rhf',
        'root': os.path.dirname(os.path.realpath(__file__)),
        'nginx_conf_file' : 'nginx_dev.conf'
    },
    'staging': {
        'hosts': ['pc83734.ornl.gov'],
        'user': 'rhf',
        'root': '/home/rhf/git/sns-reduction',
        'nginx_conf_file' : 'nginx_staging.conf'
    },
    'production': {
        'hosts': ['reduction.sns.gov'],
        'user': 'rhf',
        'root': '/var/www/sns-reduction',
        'nginx_conf_file' : 'nginx_prod.conf'
    }
}

# Auxiliary funct

def role_value(role_name):
    d = env.roledefs[env.effective_roles[0]]
    return d[role_name]


def set_paths():
    global PROJECT_ROOT, DIST_ROOT, VENV_ROOT, SRC_ROOT
    PROJECT_ROOT = role_value('root')
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
        

@task
@roles('dev')
def deploy_dev():
    set_paths()
    deploy()

@task
@roles('staging')
def deploy_staging():
    pass

@task
@roles('production')
def deploy_prod():
    pass