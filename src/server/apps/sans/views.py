from django.http import Http404
import json
import logging
import os
from pprint import pformat
from datetime import datetime

from django.contrib import messages
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.contenttypes.models import ContentType
from django.core.serializers.json import DjangoJSONEncoder
from django.core.urlresolvers import reverse
from django.core.urlresolvers import reverse_lazy
from django.http import Http404
from django.shortcuts import get_object_or_404
from django.views.generic import CreateView, ListView, DetailView, UpdateView, \
    DeleteView, RedirectView, TemplateView

from server.apps.catalog.models import Instrument
from server.apps.users.ldap_util import LdapSns
from server.util import script
from server.util.formsets import FormsetMixin

from django_remote_submission.models import Job, Server
from django_remote_submission.tasks import submit_job_to_server, LogPolicy
from server.settings.env import env

from .gpsans.forms import GPSANSConfigurationForm, GPSANSReductionForm, GPSANSRegionForm, \
    GPSANSReductionScriptForm, GPSANSRegionInlineFormSetCreate, GPSANSRegionInlineFormSetUpdate
from .gpsans.models import GPSANSConfiguration, GPSANSReduction, GPSANSRegion

logger = logging.getLogger(__name__)


class ConfigurationMixin(object):
    '''
    Base for all the Instruments
    '''
    params = {
        "eqsans" : {},
        "biosans" : {},
        "gpsans" : {
            "models" :
            {
                "configuration" : GPSANSConfiguration,
                "reduction" : GPSANSReduction,
                "region" : GPSANSRegion,
            },
            "forms" :
            {
                "configuration" : GPSANSConfigurationForm,
                "reduction" : GPSANSReductionForm,
                "reduction_script" : GPSANSReductionScriptForm,
                "region" : GPSANSRegionForm,
                "region_formset_create" : GPSANSRegionInlineFormSetCreate,
                "region_formset_update" : GPSANSRegionInlineFormSetUpdate,
            },
            "templates" : {

            },
            "urls" : {
                "" : reverse_lazy('sans:GPSANS:configuration_list'),

            },
        }
    }

    instrument_name = None

    def _set_instrument_name(self, request):
        '''
        Get instrument name from the session
        '''
        instrument = request.session['instrument']
        self.instrument_name = instrument.name

    def dispatch(self, request, *args, **kwargs):
        '''
        Overload
        '''
        self._set_instrument_name(request)
        return super(ConfigurationMixin, self).dispatch(request, *args, **kwargs)

class ConfigurationMixinModel(ConfigurationMixin):
    '''
    Specialization of ConfigurationMixin
    '''
    model = None

    def dispatch(self, request, *args, **kwargs):
        '''
        Overload
        '''
        handler = super(ConfigurationMixinModel, self).dispatch(request, *args, **kwargs)
        self.model = self.params[self.instrument_name]["models"]["configuration"]
        return handler

    def get_queryset(self):
        '''
        Make sure the user only accesses its configurations
        '''
        return self.model.objects.filter(user=self.request.user)


#
# Configuration class based views
#

class ConfigurationList(LoginRequiredMixin, ConfigurationMixinModel, ListView):
    '''
    List all configurations.
    '''
    def get_queryset(self):
        return super(ConfigurationList, self).get_queryset()

class ConfigurationDetail(LoginRequiredMixin, ConfigurationMixinModel, DetailView):
    '''
    Detail of a configuration
    '''
    def get_queryset(self):
        queryset = super(ConfigurationDetail, self).get_queryset()
        return queryset.filter(id=self.kwargs['pk'])

class ConfigurationCreate(LoginRequiredMixin, ConfigurationMixin, CreateView):
    '''
    Detail of a configuration
    '''
    template_name = 'sans/configuration_form.html'

    def form_valid(self, form):
        """
        Sets initial values which are hidden in the form
        """
        form.instance.user = self.request.user
        form.instance.instrument = get_object_or_404(Instrument, name=self.instrument_name)
        return CreateView.form_valid(self, form)


class ConfigurationUpdate(LoginRequiredMixin, ConfigurationMixin, UpdateView):
    '''
    Detail of a configuration
    '''
    template_name = 'sans/configuration_form.html'

class ConfigurationDelete(LoginRequiredMixin, DeleteView):
    
    success_url = reverse_lazy('sans:GPSANS:configuration_list')

    def get_object(self, queryset=None):
        """
        Hook to ensure object is owned by request.user.
        """
        obj = super(ConfigurationDelete, self).get_object()
        if not obj.user  == self.request.user:
            raise Http404
        return obj

    def delete(self, request, *args, **kwargs):
        logger.debug("Deleting Configuration %s"%self.get_object())
        messages.success(request, 'Configuration %s deleted.'%(self.get_object()))
        return super(ConfigurationDelete, self).delete(request, *args, **kwargs)
    
    