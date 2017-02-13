from django.conf.urls import url

from . import views
from django.views.generic import TemplateView

urlpatterns = [
     # Configurations
    url(r'^live$', TemplateView.as_view(template_name='results/live.html'), name='live'),
]
