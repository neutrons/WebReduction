import logging
import os
from pprint import pformat

from django.contrib import messages
from django.http import Http404
from django.contrib.auth.mixins import LoginRequiredMixin
from django.urls import reverse_lazy
from django.shortcuts import get_object_or_404
from django.views.generic import (
    CreateView, DeleteView, DetailView, ListView, TemplateView, UpdateView)
from server.apps.catalog.models import Instrument
from server.apps.users.ldap_util import LdapSns
from server.apps.catalog.oncat.facade import Catalog


logger = logging.getLogger(__name__)  # pylint: disable=C0103


class ConfigurationMixin(object):
    '''
    Sets everything for configuration
    When the form_class is defined the model is only used if needed!
    '''

    # usefull
    facility_obj = None
    instrument_obj = None

    def dispatch(self, request, *args, **kwargs):
        '''
        ** Overload **
        First method to be called in a View
        It sets the member variables
        '''

        self.instrument_obj = self.request.user.profile.instrument
        self.facility_obj = self.instrument_obj.facility

        return super(ConfigurationMixin, self).dispatch(request, *args, **kwargs)

    def get_queryset(self):
        '''
        Make sure the user only accesses its configurations
        '''
        return self.model.objects.filter(users=self.request.user)


class ConfigurationCreateMixin(object):

    def form_valid(self, form):
        """
        Sets initial values which are hidden in the form
        """
        form.instance.instrument = get_object_or_404(
            Instrument, name=self.instrument_obj.name)
        form.save() # model needs to be sabed before inserting manytomany values
        logger.debug("Configuration valid. Adding user {}".format(self.request.user))
        form.instance.users.add(self.request.user)

        return CreateView.form_valid(self, form)


class ConfigurationDeleteMixin(object):

    def get_object(self, queryset=None):
        """
        Hook to ensure object is owned by request.user.
        """
        obj = super().get_object()
        if not obj.user == self.request.user:
            raise Http404("The user {} is not the owner of {}.".format(
                self.request.user, obj))
        return obj

    def delete(self, request, *args, **kwargs):
        logger.debug("Deleting Configuration %s ", self.get_object())
        messages.success(request,
                         'Configuration %s deleted.' % self.get_object())
        return super().delete(request, *args, **kwargs)


class ConfigurationCloneMixin(object):

    def get_object(self, queryset=None):
        '''
        Overrides DetailView.get_object and
        '''
        obj = self.model.objects.clone(self.kwargs['pk'])
        self.kwargs['pk'] = obj.pk
        messages.success(
            self.request,
            "Configuration {} cloned. The new id is  {}. "
            "Click <a href='{}'> HERE </a> to change it.".format(
                obj, obj.pk, reverse_lazy("configuration:update",
                                          args=[obj.pk])))
        return obj


class ConfigurationAssignListUidMixin(object):

    def get_context_data(self, **kwargs):
        '''
        Fromat of the object_list:
        ..., {'name': 'Durniak, Celine', 'uid': 'celine_durniak'},
            {'name': 'Legg, Max', 'uid': 'mlegg'}]
        '''
        context = super().get_context_data(**kwargs)
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

class ConfigurationAssignListIptsMixin(object):

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
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
        logger.debug(pformat(this_instrument_ipts))
        context['object_list'] = this_instrument_ipts #[d['ipts'] for d in this_instrument_ipts]
        obj = self.model.objects.get(pk=kwargs['pk'])
        context['object'] = obj
        return context

class ConfigurationAssignUidMixin(object):

    def get(self, request, *args, **kwargs):
        obj = self.model.objects.clone_and_assign_new_uid(
            kwargs['pk'], kwargs['uid'])
        messages.success(request, "Configuration %s assigned to the user %s."
            " New configuration id = %s." % (
                obj, obj.users.first().username, # I know in this case there's only a user
                obj.pk))
        return super().get(request, *args, **kwargs)

class ConfigurationAssignIptsMixin(object):

    def get(self, request, *args, **kwargs):
        obj = self.model.objects.clone_and_assign_new_uids_based_on_ipts(
            kwargs['pk'], kwargs['ipts'])
    
        users_list = list(obj.users.values_list('username', flat=True)) 
        messages.success(
            request,
            "Configuration %s assigned to the users: "
            "%s. New configuration id = %s." % (
                obj, ", ".join(users_list), obj.pk))
        return super().get(request, *args, **kwargs)
