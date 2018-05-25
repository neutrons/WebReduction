from django.conf.urls import url

from .views import *

# pylint: disable=C0103
urlpatterns = [
    url(r'^$', reduction_list, name='list'),
    url(r'^(?P<pk>\d+)$', reduction_detail, name='detail'),
    url(r'^create$', reduction_create, name='create'),
    url(r'^update/(?P<pk>\d+)$', reduction_update, name='update'),
    url(r'^delete/(?P<pk>\d+)$', reduction_delete, name='delete'),
    url(r'^clone/(?P<pk>\d+)$', reduction_clone, name='clone'),
    url(r'^script/(?P<pk>\d+)$', reduction_script_update, name='script'),
]
