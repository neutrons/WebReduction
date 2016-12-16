import environ

ROOT_DIR = environ.Path(__file__) - 3  # (/a/b/myfile.py - 3 = /)
APPS_DIR = ROOT_DIR('server/apps')

env = environ.Env()
env.read_env(ROOT_DIR('.env'))

#environ.Env.read_env()



