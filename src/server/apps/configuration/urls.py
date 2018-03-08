from django.conf.urls import url

from .views import *

urlpatterns = [
    url(r'^$', ConfigurationList.as_view(), name='list'),
    url(r'^(?P<pk>\d+)$', ConfigurationDetail.as_view(), name='detail'),
    url(r'^create$', ConfigurationCreate.as_view(), name='create'),
    url(r'^(?P<pk>\d+)/update$', ConfigurationUpdate.as_view(), name='update'),
    url(r'^(?P<pk>\d+)/delete$', ConfigurationDelete.as_view(), name='delete'),
    url(r'^(?P<pk>\d+)/clone$', ConfigurationClone.as_view(), name='clone'),
    url(r'^(?P<pk>\d+)/assign_uid$', ConfigurationAssignListUid.as_view(), name='assign_list_uid'),
    url(r'^(?P<pk>\d+)/assign_ipts$', ConfigurationAssignListIpts.as_view(), name='assign_list_ipts'),
    url(r'^(?P<pk>\d+)/assign_uid/(?P<uid>[\w\-]+)$', ConfigurationAssignUid.as_view(), name='assign_uid'),
    url(r'^(?P<pk>\d+)/assign_ipts/(?P<ipts>[\w\-\:\.]+)$', ConfigurationAssignIpts.as_view(), name='assign_ipts'),
]
