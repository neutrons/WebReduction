import logging
from pprint import pformat

from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.cache import cache_page
from django.views.generic import TemplateView, View

from .oncat.facade import Catalog

from .models import Instrument
from .permissions import (filter_user_permission,
                          user_has_permission_to_see_this_ipts)

logger = logging.getLogger(__name__)


class InstrumentMixin(object):
    '''
    Context enhancer
    mixin that sets the shared context variables:
    instrument
    '''
    def get_context_data(self, **kwargs):
        context = super(InstrumentMixin, self).get_context_data(**kwargs)
        context["instrument"] = kwargs.get('instrument', None)
        context["ipts"] = kwargs.get('ipts', None)
        return context


class Instruments(LoginRequiredMixin, View):
    '''
    List of visible instruments in the database
    '''
    def get(self, request):
        instruments = Instrument.objects.visible_instruments(
            facility=request.user.profile.instrument.facility)
        return render(request, 'catalog/list_instruments.html',
                      {'instruments': instruments})


class IPTSs(LoginRequiredMixin, InstrumentMixin, TemplateView):
    '''
    List of IPTSs for a given instrument
    '''

    template_name = 'list_iptss.html'

    def get_context_data(self, **kwargs):
        logger.debug("Listing IPTSs for: %s", kwargs['instrument'])
        facility = self.request.user.profile.instrument.facility.name
        iptss = Catalog(facility).experiments(kwargs['instrument'])
        self.template_name = 'catalog/' + facility.lower() + '/' \
            + self.template_name
        context = super(IPTSs, self).get_context_data(**kwargs)
        context['iptss'] = iptss
        return context


class Runs(LoginRequiredMixin, InstrumentMixin, TemplateView):
    '''
    List of runs for a given instrument
    '''

    template_name = 'list_runs.html'

    def get_context_data(self, **kwargs):

        facility = self.request.user.profile.instrument.facility.name
        self.template_name = 'catalog/' + facility.lower() + '/' \
            + self.template_name

        instrument = kwargs['instrument']
        ipts = kwargs['ipts']
        exp = kwargs.get('exp')
        logger.debug('Getting runs from catalog: %s %s %s %s',
                     facility, instrument, ipts, exp)
        if user_has_permission_to_see_this_ipts(
                self.request.user,
                self.request.user.profile.instrument, ipts):
            runs = Catalog(facility).runs(instrument, ipts, exp)
        else:
            # from django.http import HttpResponseForbidden
            # return HttpResponseForbidden()
            messages.error(self.request, "You do not have permission to see \
                the details of the %s from %s." % (ipts, instrument))
            runs = []
        context = super(Runs, self).get_context_data(**kwargs)
        logger.debug("Sento HTML:\n%s", pformat(runs))
        context['runs'] = runs
        return context


class RunDetail(LoginRequiredMixin, InstrumentMixin, TemplateView):
    '''
    Detail of run
    '''

    template_name = 'run_detail.html'

    def get_context_data(self, **kwargs):

        facility = self.request.user.profile.instrument.facility.name
        self.template_name = 'catalog/' + facility.lower() + '/' \
            + self.template_name

        instrument = kwargs['instrument']
        ipts = kwargs['ipts']
        exp = kwargs.get('exp')
        filename = kwargs['filename']
        logger.debug('Getting run detail from catalog: %s %s %s %s %s',
                     facility, instrument, ipts, exp, filename)
        if user_has_permission_to_see_this_ipts(
                self.request.user,
                self.request.user.profile.instrument, ipts):
            run = Catalog(facility).run(instrument, ipts, filename)
            # logger.debug(pformat(run)) # prints data => slow!
            logger.debug(pformat(run['sample_info'])) # prints data => slow!
        else:
            # from django.http import HttpResponseForbidden
            # return HttpResponseForbidden()
            messages.error(self.request, "You do not have permission to see \
                the details of the %s from %s." % (ipts, instrument))
            run = None
        context = super(RunDetail, self).get_context_data(**kwargs)
        context['run'] = run
        return context
