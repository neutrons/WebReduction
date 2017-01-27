"""
    User management
"""
import json
import logging
import os

from django.db.models import F
from django.contrib import messages
from django.contrib.auth import REDIRECT_FIELD_NAME, authenticate, login as auth_login, logout as auth_logout
from django.contrib.auth import get_user_model
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.models import Group
from django.contrib.messages.views import SuccessMessageMixin
from django.core.exceptions import ObjectDoesNotExist
from django.core.urlresolvers import reverse_lazy
from django.http import JsonResponse
from django.shortcuts import get_object_or_404, redirect
from django.utils.decorators import method_decorator
from django.utils.http import is_safe_url
from django.views.decorators.cache import never_cache
from django.views.decorators.csrf import csrf_protect
from django.views.decorators.debug import sensitive_post_parameters
from django.views.generic import CreateView, UpdateView, FormView, RedirectView, ListView, TemplateView
from django.http import JsonResponse
from django.core import serializers
from server.settings.env import env
from django_remote_submission.remote import RemoteWrapper
from django_remote_submission.models import Server

from .forms import UserProfileForm
from .models import UserProfile


logger = logging.getLogger('users')

class LoginView(FormView):
    """

    """
    form_class = AuthenticationForm
    template_name = 'users/login.html'
    redirect_field_name = REDIRECT_FIELD_NAME
    success_url = reverse_lazy('index')
    
    create_profile_url = reverse_lazy('users:profile_create')


    @method_decorator(sensitive_post_parameters('password'))
    @method_decorator(csrf_protect)
    @method_decorator(never_cache)
    def dispatch(self, request, *args, **kwargs):
        return super(LoginView, self).dispatch(request, *args, **kwargs)

    def form_valid(self, form):
        # Mathieu athentication
        username = form.cleaned_data["username"]
        password = form.cleaned_data["password"]
        user = authenticate(username=username, password=password)
        if user is not None and not user.is_anonymous():
            logger.debug("Authenticating user %s..."%username)
            auth_login(self.request, user)
            logger.debug("User %s authenticated."%username)
            # let's drop the key
            self._drop_the_public_key_on_the_cluster(username, password)
        else:
            messages.error(self.request, "Django Authenticate Failed. Invalid username or password!")

        # Default authentication (NO PASSWORD!)
#         auth_login(self.request, form.get_user())

        return super(LoginView, self).form_valid(form)

    
    def get_success_url(self):
        try:
            UserProfile.objects.get(user = self.request.user)
        except ObjectDoesNotExist:
            logger.info("Redirecting to create user profile!")
            return self.create_profile_url

        redirect_to = self.request.GET.get(self.redirect_field_name,'/')
        if not is_safe_url(url=redirect_to, host=self.request.get_host()):
            redirect_to = self.success_url
        return redirect_to

    def form_invalid(self, form):
        messages.error(self.request, "Invalid username or password!")
        return super(LoginView, self).form_invalid(form)
    
    def _drop_the_public_key_on_the_cluster(self, username, password):
        '''
        Drops the public key in the cluster
        So Job submissionn will be done without password 
        '''
        server_name = env("JOB_SERVER_NAME")
        public_key_path = env("JOB_PUBLIC_KEY_PATH")
        logger.debug("Dropping the key %s in %s.", public_key_path, server_name)
        server = get_object_or_404(Server, title=server_name)
        logger.debug("Server: %s.", server.hostname)
        wrapper = RemoteWrapper(hostname=server.hostname, username=username)
        wrapper.connect(password, public_key_path)
        wrapper.close()

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
        if UserProfile.objects.filter(user = request.user).count() > 0:
            if 'instrument' not in self.request.session:
                self.request.session['instrument'] = UserProfile.objects.get(user=request.user).instrument
            return super(ProfileView, self).get(request, *args, **kwargs)
        else:
            return redirect(reverse_lazy('users:profile_create'))


class ProfileUpdate(LoginRequiredMixin,SuccessMessageMixin, UpdateView):
    '''
    I'm using form_class to test crispy forms
    '''
    model = UserProfile
    form_class = UserProfileForm
    # fields = '__all__'
    success_url = reverse_lazy('index')
    success_message = "Your profile was updated successfully."

    def get_form(self, form_class=None):
        form_class = super(UpdateView, self).get_form(form_class)
        form_class.fields['ipts'].queryset = Group.objects.filter(name__istartswith="SNS").filter(user = self.request.user)
        return form_class

    def form_valid(self, form):
        '''
        Add instrument to session
        '''
        print("Instance:", form.instance)
        self.request.session['instrument'] = form.instance.instrument
        return super(ProfileUpdate, self).form_valid(form)

class ProfileCreate(LoginRequiredMixin,SuccessMessageMixin,CreateView):
    model = UserProfile
    form_class = UserProfileForm
    #fields = ['home_institution', 'email_address']
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

#
# JSON Methods
#

class GroupMixin(object):
    def get_queryset(self):
        '''
        Make sure the user only accesses its groups
        '''
        return Group.objects.filter(user = self.request.user)

class GroupListJson(LoginRequiredMixin, GroupMixin, ListView):
    '''
    List all groups for in json for this user.
    '''
    def get(self, request, *args, **kwargs):
        '''
        @return: a list for automplete in the form of:
                    [{
                      "value": 1,
                      "label": "hfir_cg3_team"
                    }, {
                      "value": 2,
                      "label": "adara"
                    }]
        '''
        qs = self.get_queryset()
        # Rename to value and label
        qs = qs.annotate(value=F('pk'), label=F('name')).values('value','label')
        # Needs safe=False because I'm returning a list not a dict!
        return JsonResponse(list(qs), safe=False)

