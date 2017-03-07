from django.conf.urls import url

from . import views

urlpatterns = [
    # Common to HFIR and SNS
    url(r'^$', views.Instruments.as_view(), name='list_instruments'),
    url(r'^(?P<instrument>[\w\-]+)/$', views.IPTSs.as_view(), name='list_iptss'),
    url(r'^(?P<instrument>[\w\-]+)/(?P<ipts>[\w\-\.]+)/$',  views.Runs.as_view(), name='list_runs'),
    
    # HFIR has exp field
    url(r'^(?P<instrument>[\w\-]+)/(?P<ipts>[\w\-\.]+)/(?P<exp>exp[\d]+)/$',  views.Runs.as_view(), name='list_runs'),
    url(r'^(?P<instrument>[\w\-]+)/(?P<ipts>[\w\-\.]+)/(?P<filename>/HFIR/[^\.]+\.[A-Za-z]{3})/$',  views.RunDetail.as_view(), name='run_detail'),
    
    # I probably will remove this
    url(r'^(?P<instrument>[\w\-]+)/json$', views.get_iptss_json, name='list_iptss_json'),
    url(r'^(?P<instrument>[\w\-]+)/(?P<ipts>[\w\-\.]+)/json$',  views.get_runs_json, name='list_runs_json'),
]
