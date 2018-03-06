import json
import logging
import os
from datetime import datetime
from pprint import pformat


from django.contrib import messages
from django.contrib.auth.mixins import LoginRequiredMixin
from django.urls import reverse_lazy
from django.http import Http404, HttpResponseRedirect
from django.shortcuts import get_object_or_404
from django.views.generic import (CreateView, DeleteView, DetailView, ListView,
                                  TemplateView, UpdateView)
from django.core import signing
from django_remote_submission.models import Job, Server
from django_remote_submission.tasks import LogPolicy, submit_job_to_server
from django.urls import reverse
from server.apps.catalog.oncat.facade import Catalog
from server.apps.catalog.models import Instrument
from server.apps.users.ldap_util import LdapSns
from server.settings.env import env
from server.scripts.builder import ScriptBuilder
from server.util.formsets import FormsetMixin

from server.util.path import import_class, import_class_from_module

logger = logging.getLogger(__name__)  # pylint: disable=C0103


class ConfigurationMixin(object):
    '''
    Sets everything for configuration
    When the form_class is defined the model is only used if needed!
    '''

    # Django stuff
    model = None
    form_class = None

    # usefull
    facility_obj = None
    instrument_obj = None

    def dispatch(self, request, *args, **kwargs):
        '''
        ** Overload **
        First method to be called in a View
        '''

        self.instrument_obj = self.request.user.profile.instrument
        self.facility_obj = self.instrument_obj.facility

        self.form_class = import_class(
            self.facility_obj, self.instrument_obj, "ConfigurationForm",
            prefix=["server", "apps", "configuration"], suffix="forms.py")

        self.model = import_class_from_module(
            "server.apps.configuration.models", self.facility_obj,
            self.instrument_obj, "Configuration")

        return super(ConfigurationMixin, self).dispatch(request, *args, **kwargs)

    def get_template_names(self):
        """
        ** Overload **
        Returns a list of priority templates to render. From specific to general.
        technique/facility/instrument/self.template
        technique/facility/self.template
        technique/self.template
        self.template
        Note that the method calling this must have self.template_name defined!!
        """

        facility_name = self.facility_obj.name.lower()
        instrument_name = self.instrument_obj.name.lower()
        technique_name = self.instrument_obj.technique.lower()
        return [
            os.path.join('configuration', technique_name, facility_name,
                         instrument_name, self.template_name),
            os.path.join('configuration', technique_name, facility_name,
                         self.template_name),
            os.path.join('configuration', technique_name, self.template_name),
            os.path.join('configuration', self.template_name),
        ]

    def get_queryset(self):
        '''
        Make sure the user only accesses its configurations
        '''

        #TODO: Put the code to get the self.model here


        return self.model.objects.filter(user=self.request.user)

#
# Configuration
#


class ConfigurationList(LoginRequiredMixin, ConfigurationMixin, ListView):
    '''
    List all configurations.
    Gets the query from the ConfigurationMixinModel
    No need for any definitions
    '''
    template_name = 'configuration_list.html'


class ConfigurationDetail(LoginRequiredMixin, ConfigurationMixin, DetailView):
    '''
    Detail of a configuration
    '''
    template_name = 'sans/configuration_detail.html'

    def get_queryset(self):
        queryset = super(ConfigurationDetail, self).get_queryset()
        return queryset.filter(id=self.kwargs['pk'])


class ConfigurationCreate(LoginRequiredMixin, ConfigurationMixin, CreateView):
    '''
    Detail of a configuration
    '''
    template_name = 'sans/configuration_form.html'

    success_url = reverse_lazy('sans:configuration_list')

    def form_valid(self, form):
        """
        Sets initial values which are hidden in the form
        """
        form.instance.user = self.request.user
        form.instance.instrument = get_object_or_404(
            Instrument,
            name=self.instrument_name)
        return CreateView.form_valid(self, form)


class ConfigurationUpdate(LoginRequiredMixin, ConfigurationMixin, UpdateView):
    '''
    Detail of a configuration
    '''
    template_name = 'sans/configuration_form.html'
    success_url = reverse_lazy('sans:configuration_list')


class ConfigurationDelete(LoginRequiredMixin, ConfigurationMixin, DeleteView):

    template_name = 'sans/configuration_confirm_delete.html'
    success_url = reverse_lazy('sans:configuration_list')

    def get_object(self, queryset=None):
        """
        Hook to ensure object is owned by request.user.
        """
        obj = super(ConfigurationDelete, self).get_object()
        if not obj.user == self.request.user:
            raise Http404("The user {} is not the owner of {}.".format(
                self.request.user, obj))
        return obj

    def delete(self, request, *args, **kwargs):
        logger.debug("Deleting Configuration %s ", self.get_object())
        messages.success(request,
                         'Configuration %s deleted.' % self.get_object())
        return super(ConfigurationDelete, self).delete(request, *args, **kwargs)


class ConfigurationClone(LoginRequiredMixin, ConfigurationMixin, DetailView):
    '''
    Clones the Object Configuration. Keeps the same user
    '''

    template_name = 'sans/configuration_detail.html'

    def get_object(self, queryset=None):
        '''
        Overrires DetailView.get_object and
        '''
        obj = self.model.objects.clone(self.kwargs['pk'])
        self.kwargs['pk'] = obj.pk
        messages.success(self.request, "Configuration '%s' cloned. New id is \
            '%s'. Click Edit below to change it." % (obj, obj.pk))
        return obj


class ConfigurationAssignListUid(LoginRequiredMixin, ConfigurationMixin,
                                 TemplateView):
    '''
    List all UIDS + names and provides a link to assign a Configuration
    to a user.
    Context has 2 objects: the conf to assign and a list of uids + names
    '''
    template_name = 'sans/configuration_list_uid.html'

    def get_context_data(self, **kwargs):
        '''
        Fromat of the object_list:
        ..., {'name': 'Durniak, Celine', 'uid': 'celine_durniak'},
            {'name': 'Legg, Max', 'uid': 'mlegg'}]
        '''
        context = super(ConfigurationAssignListUid,
                        self).get_context_data(**kwargs)
        ldap_server = LdapSns()
        # This get's all users from LDAP
        # users_and_uids = ldap_server.get_all_users_name_and_uid()
        # This only gets users that have IPTS for this beamline
        this_instrument_ipts = Catalog(
            facility=self.request.user.profile.instrument.facility.name,
            technique=self.request.user.profile.instrument.technique,
            instrument=self.request.user.profile.instrument.catalog_name,
            request=self.request
        ).experiments()
        this_instrument_ipts = [d['ipts'] for d in this_instrument_ipts]
        # logger.debug(this_instrument_ipts)
        users_and_uids = []
        uids = ldap_server.get_all_uids_for_a_list_of_iptss(
            this_instrument_ipts)
        # logger.debug(uids)
        for uid in uids:
            try:
                if not any(uid == d['uid'] for d in users_and_uids):
                    name = ldap_server.get_user_name(uid)
                    users_and_uids.append({'name': name, 'uid': uid})
            except IndexError:
                # Don't ask me why but some uids don't exist in the LDAP
                pass

        logger.debug(users_and_uids)
        context['object_list'] = list(users_and_uids)
        obj = self.model.objects.get(pk=kwargs['pk'])
        context['object'] = obj
        return context


class ConfigurationAssignListIpts(LoginRequiredMixin, ConfigurationMixin,
                                  TemplateView):
    '''
    List all IPTSs and provides a link to assign a Configuration
    to all users to that IPTS.
    Context has 2 objects: the conf to assign and a list of ipts
    '''
    template_name = 'sans/configuration_list_ipts.html'

    def get_context_data(self, **kwargs):
        context = super(ConfigurationAssignListIpts,
                        self).get_context_data(**kwargs)
        # Get IPTSs from LDAP
        # ldap_server = LdapSns()
        # all_ipts = ldap_server.get_all_ipts()
        # logger.debug(all_ipts)
        # For now, I'm getting the IPTSs from ICAT
        this_instrument_ipts = Catalog(
            facility=self.request.user.profile.instrument.facility.name,
            technique=self.request.user.profile.instrument.technique,
            instrument=self.request.user.profile.instrument.catalog_name,
            request=self.request
        ).experiments()
        logger.debug(this_instrument_ipts)
        context['object_list'] = [d['ipts'] for d in this_instrument_ipts]
        obj = self.model.objects.get(pk=kwargs['pk'])
        context['object'] = obj
        return context


class ConfigurationAssignUid(LoginRequiredMixin, ConfigurationMixin, DetailView):
    '''
    This gets a configuration pk and uid from url, clones the Configuration
    and assigns it to the user
    It will display the original Configuration
    '''
    template_name = 'sans/configuration_detail.html'

    def get(self, request, *args, **kwargs):
        obj = self.model.objects.clone_and_assign_new_uid(
            kwargs['pk'], kwargs['uid'])
        messages.success(request, "Configuration %s assigned to the user %s. \
            New configuration id = %s." % (obj, obj.user, obj.pk))
        return super(ConfigurationAssignUid, self).get(request, *args, **kwargs)


class ConfigurationAssignIpts(LoginRequiredMixin, ConfigurationMixin,
                              DetailView):
    '''

    '''
    template_name = 'sans/configuration_detail.html'

    def get(self, request, *args, **kwargs):
        cloned_objs = self.model.objects.clone_and_assign_new_uids_based_on_ipts(
            kwargs['pk'], kwargs['ipts'])
        for obj in cloned_objs:
            messages.success(
                request,
                "Configuration %s assigned to the user "
                "%s. New configuration id = %s." % (obj, obj.user, obj.pk))
        return super(ConfigurationAssignIpts, self).get(request, *args, **kwargs)

