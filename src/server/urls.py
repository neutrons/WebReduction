"""reductionserver URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.10/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from django.contrib import admin
from django.urls import reverse_lazy
from django.views.generic.base import RedirectView
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^users/', include(('server.apps.users.urls', 'users'), namespace='users', )),
    url(r'^catalog/', include(('server.apps.catalog.urls', 'catalog'), namespace='catalog')),
    url(r'^sans/', include(('server.apps.sans.urls', 'sans'), namespace='sans')),
    url(r'^reduction/', include(('server.apps.reduction.urls',
                                 'reduction'), namespace='reduction')),
    url(r'^configuration/', include(('server.apps.configuration.urls',
                                     'configuration'), namespace='configuration')),
    url(r'^results/', include(('server.apps.results.urls', 'results'), namespace='results')),
    url(r'^util/', include(('server.util.urls', 'util'), namespace='util')),
    # For smart_selects
    url(r'^chaining/', include('smart_selects.urls')),
    # Redirects all to Homepage
    url(r'^$', RedirectView.as_view(
        url=reverse_lazy('users:profile_view'), permanent=False),
        name='index',
        ),
    # Django remote REST API
    url(r'^api/', include('django_remote_submission.urls')),

]

if settings.DEBUG:
    # Serving files uploaded by a user during development
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)
