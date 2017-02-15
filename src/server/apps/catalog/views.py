from django.shortcuts import render
from django.contrib import messages
from django.views.generic import View, TemplateView
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.decorators import login_required
from django.views.decorators.cache import cache_page
from django.http import JsonResponse

from pprint import pformat
import logging
import json

from .icat.sns.facade import Catalog

from .icat.facade import get_expriments, get_runs

from .permissions import user_has_permission_to_see_this_ipts, \
    filter_user_permission
from .models import Instrument

logger = logging.getLogger('catalog')

class InstrumentMixin(object):
    '''
    Context enhancer
    mixin that sets the shared context variables:
    instrument
    '''
    def get_context_data(self, **kwargs):
        #context = super().get_context_data(**kwargs)
        context = super(InstrumentMixin, self).get_context_data(**kwargs)
        context["instrument"] = kwargs.get('instrument', None)
        context["ipts"] = kwargs.get('ipts', None)
        return context

class Instruments(LoginRequiredMixin,View):
    '''
    List of visible instruments in the database
    '''
    def get(self, request):
        instruments = Instrument.objects.visible_instruments(facility=request.user.profile.instrument.facility)
        return render(request, 'catalog/list_instruments.html',
                      {'instruments' : instruments})


class IPTSs(LoginRequiredMixin,InstrumentMixin, TemplateView):
    '''
    List of IPTSs for a given instrument
    '''

    template_name = 'list_iptss.html'

    def get_context_data(self, **kwargs):
        # icat = Catalog()
        # iptss = icat.get_experiments_meta(kwargs['instrument'])
        facility = self.request.user.profile.instrument.facility.name
        iptss = get_expriments(
            facility,
            kwargs['instrument']
        )
        self.template_name = 'catalog/' + facility.lower() + '/' + self.template_name

        context = super(IPTSs, self).get_context_data(**kwargs)
        context['iptss'] = iptss
        return context


class Runs(LoginRequiredMixin,InstrumentMixin,TemplateView):
    '''
    List of runs for a given instrument
    '''

    template_name = 'list_runs.html'

    def get_context_data(self, **kwargs):

        facility = self.request.user.profile.instrument.facility.name
        self.template_name = 'catalog/' + facility.lower() + '/' + self.template_name

        instrument = kwargs['instrument']
        ipts = kwargs['ipts']
        exp = kwargs.get('exp')
        logger.debug('Getting runs from catalog: %s %s %s %s', facility, instrument, ipts, exp )
        if user_has_permission_to_see_this_ipts(self.request.user, instrument, ipts):
            runs = get_runs(facility, instrument, ipts, exp)
        else:
            # from django.http import HttpResponseForbidden
            # return HttpResponseForbidden()
            messages.error(self.request, "You do not have permission to see the details of the %s from %s."%(ipts,instrument))
            runs = []
        context = super(Runs, self).get_context_data(**kwargs)
        context['runs'] = runs
        return context

######### Not used

@login_required
@cache_page(120)
def get_iptss_json(request, instrument):
    """
         Ajax call to get all the possible experiments (retrieved from ICAT)
         They will be filtered wether user can access to it or not
    """
    icat = Catalog()
    experiment_list = icat.get_experiments_id_and_title(instrument)
    #  [ {'value' : '...', 'label' : '....'}, ..... ]
    ipts_list = [i['value'] for i in experiment_list]
    allowed_ipts_list = filter_user_permission(request.user, instrument, ipts_list)
    allowed_experiment_list = [exp for exp in experiment_list if exp['value'] in allowed_ipts_list ]
    response = JsonResponse(allowed_experiment_list, safe=False)
    return response


@login_required
@cache_page(120)
def get_runs_json(request, instrument, ipts):
    """
         Ajax call to get all the possible runs (retrieved from ICAT)
    """
    icat = Catalog()
    experiment_list = icat.get_run_number_and_title(instrument,ipts)
    response = JsonResponse(experiment_list, safe=False)
    return response
