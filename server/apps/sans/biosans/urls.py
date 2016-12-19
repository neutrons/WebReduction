from .views import *


from django.conf.urls import url


urlpatterns = [
    url(r'^$', ConfigurationList.as_view(), name='configuration_list'),
    url(r'^(?P<pk>\d+)$', ConfigurationDetail.as_view(), name='configuration_detail'),
    url(r'^create$', ConfigurationCreate.as_view(), name='configuration_create'),
    url(r'^(?P<pk>\d+)/update$', ConfigurationUpdate.as_view(), name='configuration_update'),
    url(r'^(?P<pk>\d+)/delete$', ConfigurationDelete.as_view(), name='configuration_delete'),
]

