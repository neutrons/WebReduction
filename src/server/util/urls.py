
from django.conf.urls import url
from .views import dirlist

'''

Auxiliary URLs not related to the apps

'''

urlpatterns = [
    url(r'^dirlist$', dirlist, name='dirlist'),
]
