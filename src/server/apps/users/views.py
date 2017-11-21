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
from django.core import signing

from pprint import pformat
from server.settings.env import env

from .forms import UserProfileCatalogForm, UserProfileReductionForm, LoginForm
from .models import UserProfile
from server.apps.catalog.models import Instrument
from server.apps.catalog.oncat.facade import Catalog

logger = logging.getLogger(__name__)


class LoginView(FormView):
    """

    """
    form_class = LoginForm
    template_name = 'users/login.html'
    redirect_field_name = REDIRECT_FIELD_NAME
    success_url = reverse_lazy('index')
    create_profile_url = reverse_lazy('users:profile_catalog_create')

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
        user = authenticate(self.request, username=username, password=password)
        if user is not None and not user.is_anonymous():
            logger.debug("Authenticating user %s...", username)
            auth_login(self.request, user)
            logger.debug("User %s authenticated.", username)
            # let's save the credentials to login on analysisis later
            self._save_credentials_in_session(password)
        else:
            messages.error(
                self.request,
                "Django Authenticate Failed. Invalid username or password!"
            )

        # Default authentication (NO PASSWORD!)
        # auth_login(self.request, form.get_user())
        return super(LoginView, self).form_valid(form)

    def get(self, request, *args, **kwargs):
        """
        Same as django.views.generic.edit.ProcessFormView.get()
        If the user is logged in anf hits: /users/login
        Rather than show the login form, redirect it to index
        """
        if request.user.is_authenticated():
            # Redirect to profile
            return redirect(reverse_lazy('index'))
        else:
            return super(LoginView, self).get(request, *args, **kwargs)

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
        I need to save the password to authenticate in OnCat and analysis later
        TODO: Sessions should be saved in memory. See redis option also.
        '''
        logger.debug("Setting credentials in the session...")
        self.request.session["password"] = signing.dumps(password)


class LogoutView(RedirectView):
    """
    Provides users the ability to logout
    """
    url = reverse_lazy('users:login')

    def get(self, request, *args, **kwargs):
        auth_logout(request)
        response = super(LogoutView, self).get(request, *args, **kwargs)
        return response

#
# Profile Catalog
#

class ProfileView(LoginRequiredMixin, TemplateView):

    template_name = "index.html"

    def get(self, request, *args, **kwargs):
        '''
        If the user exists show the ProfileCatalog,
        otherwise redirect to create ProfileCatalog
        '''
        if UserProfile.objects.filter(user=request.user).count() > 0:
            return super(ProfileView, self).get(request, *args, **kwargs)
        else:
            return redirect(reverse_lazy('users:profile_catalog_create'))


class ProfileCatalogUpdate(LoginRequiredMixin, SuccessMessageMixin,
                           UpdateView):
    '''
    I'm using form_class to test crispy forms
    '''
    model = UserProfile
    form_class = UserProfileCatalogForm
    template_name = 'users/profile_catalog_form.html'
    # fields = '__all__'
    success_url = reverse_lazy('index')
    success_message = "Your Profile for the Catalog was updated successfully."

    # def get_context_data(self, **kwargs):
    #     """
    #     I was trying to get all the instruments where reduction is available
    #     but at this point we don't know the facility yet. Let's postpone it.
    #     """
    #     context = super(ProfileCatalogUpdate, self).get_context_data(**kwargs)
    #     context['instruments_with_reduction'] = list(
    #         Instrument.objects.filter(reduction_available=True).values_list("name", flat=True)
    #     )
    #     return context


class ProfileCatalogCreate(LoginRequiredMixin, SuccessMessageMixin,
                           CreateView):
    model = UserProfile
    form_class = UserProfileCatalogForm
    template_name = 'users/profile_catalog_form.html'
    # fields = ['home_institution', 'email_address']
    success_url = reverse_lazy('index')
    success_message = "Your Profile for the Catalog was created successfully."

    def form_valid(self, form):
        '''
        Add user to the form as it is not shown to the user
        '''
        user = self.request.user
        form.instance.user = user
        return super(ProfileCatalogCreate, self).form_valid(form)

#
#
#

class ProfileReductionUpdate(LoginRequiredMixin, SuccessMessageMixin,
                             UpdateView):
    '''
    
    '''
    model = UserProfile
    form_class = UserProfileReductionForm
    template_name = 'users/profile_reduction_form.html'
    # fields = '__all__'
    success_url = reverse_lazy('index')
    success_message = "Your Profile for the Reduction was updated successfully."

    # def get(self, request, *args, **kwargs):

    #     instrument = request.user.profile.instrument
    #     facility = request.user.profile.facility

    #     logger.debug("Listing IPTS for: %s", instrument)
        
    #     iptss = Catalog(facility.name, request).experiments(
    #         instrument.catalog_name
    #     )
    #     logger.debug(pformat(iptss))
        
    #     return super(ProfileReductionUpdate, self).get(request, *args, **kwargs)

    def get_initial(self):
        """
        Returns the initial data to use for forms on this view.
        """
        initial = super(ProfileReductionUpdate, self).get_initial()

        from pprint import pprint
        pprint(initial)

        initial['ipts'] = (('IPTS-19988', 'Understanding and Manipulating Domain Wall Order in Mn3O4'),)
        pprint(initial)
        return initial


    # def __init__(self, *args, **kwargs):
        
    #     super(UserProfileReductionForm, self).__init__(*args, **kwargs)
    #     choices = self.fields['ipts'].choices
    #     self.fields['ipts'].choices = choices.extend(('IPTS-123', 'IPTS-454545'), )

    #     return initial