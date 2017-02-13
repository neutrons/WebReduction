from django.conf.urls import url
from django.views.generic import TemplateView

from .views import *

urlpatterns = [
     # Configurations
    url(r'^$', JobsList.as_view(), name='list'),
    url(r'^(?P<pk>\d+)$', JobDetail.as_view(), name='detail'),
    url(r'^live$', TemplateView.as_view(template_name='results/live.html'), name='live'),
]
