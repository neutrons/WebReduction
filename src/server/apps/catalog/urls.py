from django.conf.urls import url
from django.views.decorators.cache import cache_page

from . import views

urlpatterns = [
    # Common to HFIR and SNS
    url(r'^$', views.Instruments.as_view(), name='list_instruments'),
    # View IPTSs fpr an instrument
    url(r'^(?P<instrument>[\w\-]+)/$',
        # cache_page(60*60)(views.IPTSs.as_view()), name='list_iptss'),
        (views.IPTSs.as_view()), name='list_iptss'),
     
    # Just for SNS
    # View all Runs for an instrument
    url(r'^(?P<instrument>[\w\-]+)/(?P<ipts>[\w\-\.]+)/$',
        views.Runs.as_view(), name='list_runs'),
    # run detail
    url(r'^(?P<instrument>[\w\-]+)/(?P<ipts>[\w\-\.]+)/(?P<filename>/SNS/[^\.]+(\.\w+)+)/$',
        views.RunDetail.as_view(), name='run_detail'),    

    # HFIR has exp field
    url(r'^(?P<instrument>[\w\-]+)/(?P<ipts>[\w\-\.]+)/(?P<exp>exp[\d]+)/$',
        views.Runs.as_view(), name='list_runs'),
    url(r'^(?P<instrument>[\w\-]+)/(?P<ipts>[\w\-\.]+)/(?P<exp>exp[\d]+)/ajax/$',
        views.RunsAjax.as_view(), name='list_runs_ajax'),
    url(r'^(?P<instrument>[\w\-]+)/(?P<ipts>[\w\-\.]+)/(?P<exp>exp[\d]+)/(?P<filename>/HFIR/[^\.]+\.[A-Za-z]{3})/$',
        views.RunDetail.as_view(), name='run_detail'),
    url(r'^(?P<instrument>[\w\-]+)/(?P<ipts>[\w\-\.]+)/(?P<exp>exp[\d]+)/(?P<filename>/HFIR/[^\.]+\.[A-Za-z]{3})/file/$',
        views.RunFile.as_view(), name='run_file'),
   
]
