"""
    User management
"""
import json
import logging
import os

from django.contrib import messages
from django.contrib.auth import login as auth_login
from django.contrib.auth import logout as auth_logout
from django.contrib.auth import (REDIRECT_FIELD_NAME, authenticate,
                                 get_user_model)

from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.models import Group
from django.contrib.messages.views import SuccessMessageMixin
from django.core import serializers
from django.core.exceptions import ObjectDoesNotExist
from django.core.urlresolvers import reverse_lazy
from django.db.models import F
from django.http import JsonResponse
from django.shortcuts import get_object_or_404, redirect
from django.utils.decorators import method_decorator
from django.utils.http import is_safe_url
from django.views.decorators.cache import never_cache
from django.views.decorators.csrf import csrf_protect
from django.views.decorators.debug import sensitive_post_parameters
from django.views.generic import (CreateView, FormView, ListView, RedirectView,
                                  TemplateView, UpdateView)
from django_remote_submission.models import Server
from django_remote_submission.remote import RemoteWrapper

from server.settings.env import env

from .forms import UserProfileForm, LoginForm
from .models import UserProfile, Experiment

logger = logging.getLogger(__name__)


class LoginView(FormView):
    """

    """
    form_class = LoginForm
    template_name = 'users/login.html'
    redirect_field_name = REDIRECT_FIELD_NAME
    success_url = reverse_lazy('index')
    create_profile_url = reverse_lazy('users:profile_create')

    @method_decorator(sensitive_post_parameters('password'))
    @method_decorator(csrf_protect)
    @method_decorator(never_cache)
    def dispatch(self, request, *args, **kwargs):
        # This prints the password
        # logger.debug(request.POST)
        return super(LoginView, self).dispatch(request, *args, **kwargs)

    def form_valid(self, form):
        # Mathieu athentication
        username = form.cleaned_data["username"]
        password = form.cleaned_data["password"]
        user = authenticate(username=username, password=password)
        if user is not None and not user.is_anonymous():
            logger.debug("Authenticating user %s...", username)
            auth_login(self.request, user)
            logger.debug("User %s authenticated.", username)
            # let's save the credentials to login on analysisis later
            self._save_credentials_in_session(password)
            # Populates Icat into database
            Experiment.objects.populate_experiments()
        else:
            messages.error(
                self.request,
                "Django Authenticate Failed. Invalid username or password!"
            )

        # Default authentication (NO PASSWORD!)
        # auth_login(self.request, form.get_user())
        return super(LoginView, self).form_valid(form)

    def get_success_url(self):
        try:
            UserProfile.objects.get(user=self.request.user)
        except ObjectDoesNotExist:
            logger.info("Redirecting to create user profile!")
            return self.create_profile_url

        redirect_to = self.request.GET.get(self.redirect_field_name, '/')
        if not is_safe_url(url=redirect_to, host=self.request.get_host()):
            redirect_to = self.success_url
        return redirect_to

    def form_invalid(self, form):
        messages.error(self.request, "Invalid username or password!")
        return super(LoginView, self).form_invalid(form)

    def _save_credentials_in_session(self, password):
        '''
        '''
        logger.debug("Setting credentials in the session...")
        self.request.session["password"] = password


class LogoutView(RedirectView):
    """
    Provides users the ability to logout
    """
    url = reverse_lazy('users:login')

    def get(self, request, *args, **kwargs):
        auth_logout(request)
        response = super(LogoutView, self).get(request, *args, **kwargs)
        return response


class ProfileView(LoginRequiredMixin, TemplateView):

    template_name = "index.html"

    def get(self, request, *args, **kwargs):
        if UserProfile.objects.filter(user=request.user).count() > 0:
            if 'instrument' not in self.request.session:
                self.request.session['instrument'] = UserProfile.objects.get(
                    user=request.user).instrument
            return super(ProfileView, self).get(request, *args, **kwargs)
        else:
            return redirect(reverse_lazy('users:profile_create'))


class ProfileUpdate(LoginRequiredMixin, SuccessMessageMixin,
                    UpdateView):
    '''
    I'm using form_class to test crispy forms
    '''
    model = UserProfile
    form_class = UserProfileForm
    # fields = '__all__'
    success_url = reverse_lazy('index')
    success_message = "Your profile was updated successfully."

    def form_valid(self, form):
        '''
        Add instrument to session
        '''
        self.request.session['instrument'] = form.instance.instrument
        return super(ProfileUpdate, self).form_valid(form)


class ProfileCreate(LoginRequiredMixin, SuccessMessageMixin,
                    CreateView):
    model = UserProfile
    form_class = UserProfileForm
    # fields = ['home_institution', 'email_address']
    success_url = reverse_lazy('index')
    success_message = "Your profile was created successfully."

    def form_valid(self, form):
        '''
        Add user to the form as it is not shown to the user
        '''
        user = self.request.user
        form.instance.user = user
        self.request.session['instrument'] = form.instance.instrument
        return super(ProfileCreate, self).form_valid(form)
