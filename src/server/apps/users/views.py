"""
    User management
"""
import json
import logging
import os

from natsort import natsorted
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
from django.urls import reverse_lazy
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
from django import forms

from .forms import UserProfileForm, LoginForm
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
    success_url = reverse_lazy('catalog:list_iptss')
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
        user = authenticate(self.request, username=username, password=password)
        if user is not None and not user.is_anonymous:
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
        if request.user.is_authenticated:
            # Redirect to profile
            return redirect(reverse_lazy('catalog:list_iptss'))
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
            return redirect(reverse_lazy('users:profile_create'))


class ProfileUpdate(LoginRequiredMixin, SuccessMessageMixin, UpdateView):
    '''
    I'm using form_class to test crispy forms
    '''
    model = UserProfile
    form_class = UserProfileForm
    template_name = 'users/profile_form.html'
    # fields = '__all__'
    success_url = reverse_lazy('catalog:list_iptss')
    success_message = "Your Profile was updated successfully."

    def get_context_data(self, **kwargs):
        """
        """
        context = super().get_context_data(**kwargs)

        # Change the form population so we only show instruments for this facility
        context['form'].fields["instrument"].queryset = Instrument.objects.filter(
            facility_id=self.object.facility.id)
        # We change the form from text field to select box in the Form class
        # We need to popukate it with choices
        # This is the only way I found to have IPTS + EXP in the form when updated
        if self.object.ipts:
            context['form'].fields["ipts"].widget=forms.Select(
                choices=[(self.object.ipts, self.object.ipts)],
                attrs={"visible_reduction": "{}".format(self.object.instrument.visible_reduction) })
            if self.object.experiment:
                context['form'].fields["experiment"].widget=forms.Select(
                    choices=[(self.object.experiment, self.object.experiment)])
        # Put in the context all instruments for this facility
        context['instruments'] = json.dumps(list(Instrument.objects.filter(
            facility_id=self.object.facility.id).values(
                "id", "beamline", "name", "visible_reduction")))
        return context



class ProfileCreate(LoginRequiredMixin, SuccessMessageMixin, CreateView):
    model = UserProfile
    form_class = UserProfileForm
    template_name = 'users/profile_form.html'
    # fields = ['home_institution', 'email_address']
    success_url = reverse_lazy('catalog:list_iptss')
    success_message = "Your Profile was created successfully."

    def form_valid(self, form):
        '''
        Add user to the form as it is not shown to the user
        '''
        user = self.request.user
        form.instance.user = user
        return super().form_valid(form)



# class ProfileReductionUpdate(LoginRequiredMixin, SuccessMessageMixin,
#                              UpdateView):
#     '''
#     This will populate the form with the Catalog options
#     '''
#     model = UserProfile
#     form_class = UserProfileReductionForm
#     template_name = 'users/profile_reduction_form.html'
#     success_url = reverse_lazy('index')
#     success_message = "Your Profile for the Reduction was updated successfully."

#     def _fetch_iptss_from_the_catalog(self):

#         iptss = Catalog(
#             facility=self.request.user.profile.instrument.facility.name,
#             technique=self.request.user.profile.instrument.technique,
#             instrument=self.request.user.profile.instrument.catalog_name,
#             request=self.request,
#         ).experiments()

#         return iptss

#     def _get_iptss_info(self):
#         '''
#         '''
#         iptss = self._fetch_iptss_from_the_catalog()

#         filtered_iptss = [
#             {k: v for k, v in d.items() if k in ['ipts', 'title', 'exp']} for d in iptss]

#         iptss = [{'ipts': d['ipts'],
#                   'exp': [exp for exp in d.get('exp', []) if exp.startswith('exp')],
#                   'title': "{} :: {}".format(d['ipts'], d['title'])}
#             for d in filtered_iptss ]
#         return iptss

#     def get_context_data(self, **kwargs):
#         '''
#         Populates the context with the list of IPTSs and experiments
#         '''
#         context = super(ProfileReductionUpdate, self).get_context_data(**kwargs)
#         context['iptss'] = self._get_iptss_info()
#         logger.debug(pformat(context['iptss']))
#         return context


class InstrumentAjax(LoginRequiredMixin, TemplateView):
    '''
    Get the run detail but in ajax format
    '''

    def get(self, request, *args, **kwargs):

        facility_id = kwargs['facility_id']

        instruments_objs = Instrument.objects.filter(
            facility__id=facility_id,
            visible_catalog=True,
        ) #.order_by('beamline')

        # instruments_data = list(instruments_objs.values())
        instruments_data = list(instruments_objs.values(
            'id', 'beamline', 'name', 'visible_reduction',
        ))

        natsorted_instruments_data = natsorted(
            instruments_data, key=lambda i: i['beamline'])

        return JsonResponse(natsorted_instruments_data, status=200, safe=False)