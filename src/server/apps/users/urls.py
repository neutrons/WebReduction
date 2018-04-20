from django.conf.urls import url
from django.urls import path

from . import views

urlpatterns = [
    url(r'^login$', views.LoginView.as_view(), name="login"),
    url(r'^logout$', views.LogoutView.as_view(), name="logout"),
    url(r'^profile$', views.ProfileView.as_view(), name="profile_view"),

    url(r'^profile/create$', views.ProfileCreate.as_view(), name="profile_create"),
    url(r'^profile/(?P<pk>\d+)/$', views.ProfileUpdate.as_view(), name="profile_update"),

    path('profile/<int:facility_id>/ajax/', views.InstrumentAjax.as_view(),
        name='list_instruments_ajax'),
]
