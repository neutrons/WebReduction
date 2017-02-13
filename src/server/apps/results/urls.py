from django.conf.urls import url
from django.views.generic import TemplateView

from .views import *

urlpatterns = [
     # Configurations
    url(r'^$', JobsList.as_view(), name='list'),
    url(r'^(?P<pk>\d+)$', JobDetail.as_view(), name='detail'),
    url(r'^livelog/(?P<pk>\d+)$', JobLiveLog.as_view(), name='livelog'),
    url(r'^live$', TemplateView.as_view(template_name='results/job_live.html'), name='live'),
]
