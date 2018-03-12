from django.conf.urls import url

from .views import *

urlpatterns = [
    # Reduction
    url(r'^$', ReductionList.as_view(), name='list'),
    url(r'^(?P<pk>\d+)/$', ReductionDetail.as_view(), name='detail'),
    url(r'^create$', ReductionCreate.as_view(), name='create'),
    url(r'^update/(?P<pk>\d+)$', ReductionUpdate.as_view(), name='update'),
    url(r'^delete/(?P<pk>\d+)$', ReductionDelete.as_view(), name='delete'),
    url(r'^clone/(?P<pk>\d+)$', ReductionClone.as_view(), name='clone'),
    url(r'^script/(?P<pk>\d+)$', ReductionScriptUpdate.as_view(), name='script'),
]
