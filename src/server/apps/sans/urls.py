from django.conf.urls import url

from .views import *

urlpatterns = [
    # Configurations
    url(r'^configuration$', ConfigurationList.as_view(), name='list'),
    url(r'^configuration/(?P<pk>\d+)$', ConfigurationDetail.as_view(), name='detail'),
    url(r'^configuration/create$', ConfigurationCreate.as_view(), name='create'),
    url(r'^configuration/(?P<pk>\d+)/update$', ConfigurationUpdate.as_view(), name='update'),
    url(r'^configuration/(?P<pk>\d+)/delete$', ConfigurationDelete.as_view(), name='delete'),
    url(r'^configuration/(?P<pk>\d+)/clone$', ConfigurationClone.as_view(), name='clone'),
    url(r'^configuration/(?P<pk>\d+)/assign_uid$', ConfigurationAssignListUid.as_view(), name='assign_list_uid'),
    url(r'^configuration/(?P<pk>\d+)/assign_ipts$', ConfigurationAssignListIpts.as_view(), name='assign_list_ipts'),
    url(r'^configuration/(?P<pk>\d+)/assign_uid/(?P<uid>[\w\-]+)$', ConfigurationAssignUid.as_view(), name='assign_uid'),
    url(r'^configuration/(?P<pk>\d+)/assign_ipts/(?P<ipts>[\w\-\:\.]+)$', ConfigurationAssignIpts.as_view(), name='assign_ipts'),
    # Reduction
    url(r'^reduction$', ReductionList.as_view(), name='reduction_list'),
    url(r'^reduction/(?P<pk>\d+)/$', ReductionDetail.as_view(), name='reduction_detail'),
    url(r'^reduction/create$', ReductionCreate.as_view(), name='reduction_create'),
    url(r'^reduction/update/(?P<pk>\d+)$', ReductionUpdate.as_view(), name='reduction_update'),
    url(r'^reduction/delete/(?P<pk>\d+)$', ReductionDelete.as_view(), name='reduction_delete'),
    url(r'^reduction/clone/(?P<pk>\d+)$', ReductionClone.as_view(), name='reduction_clone'),
    url(r'^reduction/script/(?P<pk>\d+)$', ReductionScriptUpdate.as_view(), name='reduction_script'),
]
