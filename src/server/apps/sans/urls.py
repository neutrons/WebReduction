from django.conf.urls import url, include

from . import views


urlpatterns = [
    url(r'^biosans/', include('server.apps.sans.biosans.urls', namespace='biosans')),
    url(r'^gpsans/', include('server.apps.sans.gpsans.urls', namespace='gpsans')),
    url(r'^eqsans/', include('server.apps.sans.eqsans.urls', namespace='eqsans')),
]
