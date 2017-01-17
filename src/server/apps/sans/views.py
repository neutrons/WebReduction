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

CONFIGURATION = {
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

        }
    }
}

def get_instrument_name(request):
    instrument = request.session['instrument']
    return instrument.name

class ConfigurationMixin(object):
    '''
    '''

    instrument_name = None

    def dispatch(self, request, *args, **kwargs):
        '''
        Overload
        '''
        self.instrument_name = get_instrument_name(request)
        self.model = CONFIGURATION[instrument_name]["models"]["configuration"]
        self.form_class = CONFIGURATION[instrument_name]["forms"]["configuration"]
        try:
            ret = super(ConfigurationMixin, self).dispatch(request, *args, **kwargs)
        except AttributeError:
            raise  Http404("ConfigurationMixin problems...")
        return ret

    def get_queryset(self):
        '''
        Make sure the user only accesses its configurations
        '''
        return self.model.objects.filter(user = self.request.user)


#
# Configuration class based views
#

class ConfigurationList(LoginRequiredMixin, ConfigurationMixin, ListView):
    '''
    List all configurations.
    '''
    def get_queryset(self):
        return super(ConfigurationList, self).get_queryset()

class ConfigurationDetail(LoginRequiredMixin, ConfigurationMixin, DetailView):
    '''
    Detail of a configuration
    '''
    def get_queryset(self):
        queryset = super(ConfigurationDetail, self).get_queryset()
        return queryset.filter(id=self.kwargs['pk'])

class ConfigurationCreate(LoginRequiredMixin, CConfigurationMixin, reateView):
    '''
    Detail of a configuration
    '''
    template_name = 'sans/configuration_form.html'

    def form_valid(self, form):
        """
        Sets initial values which are hidden in the form
        """
        form.instance.user = self.request.user
        form.instance.instrument = get_object_or_404(Instrument,
            name=self.instrument_name)
        return CreateView.form_valid(self, form)

