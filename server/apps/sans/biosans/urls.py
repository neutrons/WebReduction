from .views import *


from django.conf.urls import url


urlpatterns = [
    url(r'^$', ConfigurationList.as_view(), name='configuration_list'),
    url(r'^(?P<pk>\d+)$', ConfigurationDetail.as_view(), name='configuration_detail'),
    url(r'^create$', ConfigurationCreate.as_view(), name='configuration_create'),
    url(r'^(?P<pk>\d+)/update$', ConfigurationUpdate.as_view(), name='configuration_update'),
    url(r'^(?P<pk>\d+)/delete$', ConfigurationDelete.as_view(), name='configuration_delete'),
    url(r'^(?P<pk>\d+)/clone$', ConfigurationClone.as_view(), name='configuration_clone'),
    url(r'^(?P<pk>\d+)/assign_uid$', ConfigurationAssignListUid.as_view(), name='configuration_assign_list_uid'),
    url(r'^(?P<pk>\d+)/assign_ipts$', ConfigurationAssignListIpts.as_view(), name='configuration_assign_list_ipts'),
    url(r'^(?P<pk>\d+)/assign_uid/(?P<uid>\w)$', ConfigurationAssignUid.as_view(), name='configuration_assign_uid'),
    url(r'^(?P<pk>\d+)/assign_ipts/(?P<ipts>\w)$', ConfigurationAssignIpts.as_view(), name='configuration_assign_ipts'),
]

