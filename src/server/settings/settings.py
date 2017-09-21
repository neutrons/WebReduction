"""
Django settings for reductionserver project.

Generated by 'django-admin startproject' using Django 1.10.

For more information on this file, see
https://docs.djangoproject.com/en/1.10/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/1.10/ref/settings/
"""

from .env import * #@UnusedWildImport
from .ldapauth import * #@UnusedWildImport
from .log import * #@UnusedWildImport


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/1.10/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = env("SECRET_KEY")

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = env('DEBUG', default=True)

ALLOWED_HOSTS = env.list('ALLOWED_HOSTS',
                         default=['localhost',
                                  '127.0.0.1'])

# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    # Django addons
    'crispy_forms',
    'smart_selects',
    # job sumbission
    'django_remote_submission',
    'django_celery_results',
    'channels',
    # My apps
    'server.apps.sans',
    'server.apps.users',
    'server.apps.catalog',
    'server.apps.results',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'server.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS':
            [
                ROOT_DIR('templates'),
            ],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'server.wsgi.application'


# Database
# https://docs.djangoproject.com/en/1.10/ref/settings/#databases

DATABASES = {
    'default': env.db(), # Raises ImproperlyConfigured exception if DATABASE_URL not in os.environ
    #'extra': env.db('POSTGRES_URL', default='postgres:///reduction')
}
DATABASES['default']['ATOMIC_REQUESTS'] = True


# Password validation
# https://docs.djangoproject.com/en/1.10/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/1.10/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'America/New_York'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/1.10/howto/static-files/

STATIC_URL = '/static/'

# Where default server looks for static files
STATICFILES_DIRS = [
    ROOT_DIR("static"),
]
# Folder where we put the collected static content: ./manage.py collectstatic
STATIC_ROOT = env("STATIC_ROOT", default=ROOT_DIR('../dist/static'))

# Folder where uploaded files go
MEDIA_URL = '/media/'
MEDIA_ROOT = env("MEDIA_ROOT", default=ROOT_DIR('../dist/media'))


# AUTHENTICATION CONFIGURATION
# ------------------------------------------------------------------------------
AUTHENTICATION_BACKENDS = (
   'django_auth_ldap.backend.LDAPBackend',
   'django.contrib.auth.backends.ModelBackend',
)

# Some really nice defaults
ACCOUNT_AUTHENTICATION_METHOD = 'username'
ACCOUNT_EMAIL_REQUIRED = True
ACCOUNT_EMAIL_VERIFICATION = 'mandatory'

# Custom user app defaults
# Select the correct user model
# AUTH_USER_MODEL = 'users.User'
# LOGIN_REDIRECT_URL = 'users:redirect'
LOGIN_URL = 'users:login'
AUTH_USER_MODEL = 'users.User'


#
# Other
#
CRISPY_TEMPLATE_PACK = 'bootstrap3'

ADMIN_URL = env('ADMIN_URL', default='/admin/')

# needed to make this work with bootstrap labels
from django.contrib.messages import constants as messages
MESSAGE_TAGS = {
    messages.ERROR: 'danger'
}

FIXTURE_DIRS = (
    ROOT_DIR("fixtures"),
)

# smart_selects
USE_DJANGO_JQUERY = False
#JQUERY_URL = False

# To store objects in the session
# The default is JSON and doesn't work for all objects
SESSION_SERIALIZER = 'django.contrib.sessions.serializers.PickleSerializer'

# Data catalog configuration
ONCAT_URL = 'https://oncat.ornl.gov/api'
ONCAT_TOKEN_URL = 'https://oncat.ornl.gov/oauth/token'
ONCAT_CLIENT_ID = env("ONCAT_CLIENT_ID")
ONCAT_CLIENT_SECRET = env("ONCAT_CLIENT_SECRET")

# Custom data format (comment out to us standard machine)
USE_L10N = False
DATETIME_FORMAT = 'Y-m-d H:i:s'

# Celery configuration
# For job submission
CELERY_RESULT_BACKEND = 'django-db'
CELERY_BROKER_URL = env('CELERY_BROKER_URL', default='redis://127.0.0.1:6379')

# Django Channels
# For live results
CHANNEL_LAYERS = {
    'default': {
        'BACKEND': 'asgi_redis.RedisChannelLayer',
        'CONFIG': {
            'hosts': [('127.0.0.1', 6379)],
        },
        'ROUTING': 'server.routing.channel_routing',
    },
}

