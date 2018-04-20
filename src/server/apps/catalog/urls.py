from django.conf.urls import url
from django.urls import path

from django.views.decorators.cache import cache_page

from . import views

urlpatterns = [

    # View IPTSs for an instrument
    url(r'^$',
        # cache_page(60*60)(views.IPTSs.as_view()), name='list_iptss'),
        (views.IPTSs.as_view()), name='list_iptss'),

    path('<int:intrument_id>/ajax/', views.IPTSsAjax.as_view(), name='list_iptss_ajax'),

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
    # To Zip the contents of the ipts folder (Only HFIR)
    url(r'^(?P<ipts>[\w\-\.]+)/(?P<exp>exp[\d]+)/zip/$',
        views.IptsZip.as_view(), name='zip_ipts'),

    url(r'^(?P<ipts>[\w\-\.]+)/(?P<exp>exp[\d]+)/ajax/$',
        views.RunsAjax.as_view(), name='list_runs_ajax'),
    url(r'^(?P<ipts>[\w\-\.]+)/(?P<exp>exp[\d]+)/(?P<filename>/HFIR/[^\.]+\.[A-Za-z]{3})/$',
        views.RunDetail.as_view(), name='run_detail'),
    url(r'^(?P<ipts>[\w\-\.]+)/(?P<exp>exp[\d]+)/(?P<filename>/HFIR/[^\.]+\.[A-Za-z]{3})/ajax/$',
        views.RunDetailAjax.as_view(), name='run_detail_ajax'),
    url(r'^(?P<ipts>[\w\-\.]+)/(?P<exp>exp[\d]+)/(?P<filename>/HFIR/[^\.]+\.[A-Za-z]{3})/file/$',
        views.RunFile.as_view(), name='run_file'),

]
