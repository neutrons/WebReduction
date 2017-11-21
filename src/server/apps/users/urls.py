from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^login$', views.LoginView.as_view(), name="login"),
    url(r'^logout$', views.LogoutView.as_view(), name="logout"),
    url(r'^profile$', views.ProfileView.as_view(), name="profile_view"),

    url(r'^profile_catalog/create$', views.ProfileCatalogCreate.as_view(), name="profile_catalog_create"),
    url(r'^profile_catalog/(?P<pk>\d+)/$', views.ProfileCatalogUpdate.as_view(), name="profile_catalog_update"),
    
    url(r'^profile_reduction/(?P<pk>\d+)/$', views.ProfileReductionUpdate.as_view(), name="profile_reduction_update"),
]
