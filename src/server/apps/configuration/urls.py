from django.conf.urls import url

from .views import *

urlpatterns = [
    url(r'^$', configuration_list, name='list'),
    url(r'^(?P<pk>\d+)$', configuration_detail, name='detail'),
    url(r'^create$', configuration_create, name='create'),
    url(r'^(?P<pk>\d+)/update$', configuration_update, name='update'),
    url(r'^(?P<pk>\d+)/delete$', configuration_delete, name='delete'),
    url(r'^(?P<pk>\d+)/clone$', configuration_clone, name='clone'),
    url(r'^(?P<pk>\d+)/assign_uid$', configuration_assign_list_uid, name='assign_list_uid'),
    url(r'^(?P<pk>\d+)/assign_ipts$', configuration_assign_list_ipts, name='assign_list_ipts'),
    url(r'^(?P<pk>\d+)/assign_uid/(?P<uid>[\w\-]+)$', configuration_assign_uid, name='assign_uid'),
    url(r'^(?P<pk>\d+)/assign_ipts/(?P<ipts>[\w\-\:\.]+)$', configuration_assign_ipts, name='assign_ipts'),
]
