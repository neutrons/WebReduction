from django.conf.urls import url
from django.views.decorators.cache import cache_page

from . import views

urlpatterns = [

    # View IPTSs for an instrument
    url(r'^$',
        # cache_page(60*60)(views.IPTSs.as_view()), name='list_iptss'),
        (views.IPTSs.as_view()), name='list_iptss'),

    # Just for SNS
    # View all Runs for an instrument
    url(r'^(?P<ipts>[\w\-\.]+)/$',
        views.Runs.as_view(), name='list_runs'),
    # run detail
    url(r'^(?P<ipts>[\w\-\.]+)/(?P<filename>/SNS/[^\.]+(\.\w+)+)/$',
        views.RunDetail.as_view(), name='run_detail'),

    # HFIR has exp field
    url(r'^(?P<ipts>[\w\-\.]+)/(?P<exp>exp[\d]+)/$',
        views.Runs.as_view(), name='list_runs'),
    url(r'^(?P<ipts>[\w\-\.]+)/(?P<exp>exp[\d]+)/ajax/$',
        views.RunsAjax.as_view(), name='list_runs_ajax'),
    url(r'^(?P<ipts>[\w\-\.]+)/(?P<exp>exp[\d]+)/(?P<filename>/HFIR/[^\.]+\.[A-Za-z]{3})/$',
        views.RunDetail.as_view(), name='run_detail'),
    url(r'^(?P<ipts>[\w\-\.]+)/(?P<exp>exp[\d]+)/(?P<filename>/HFIR/[^\.]+\.[A-Za-z]{3})/ajax/$',
        views.RunDetailAjax.as_view(), name='run_detail_ajax'),
    url(r'^(?P<ipts>[\w\-\.]+)/(?P<exp>exp[\d]+)/(?P<filename>/HFIR/[^\.]+\.[A-Za-z]{3})/file/$',
        views.RunFile.as_view(), name='run_file'),

]
