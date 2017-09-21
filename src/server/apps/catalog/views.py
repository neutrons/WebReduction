import logging
import os
from pprint import pformat

from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import JsonResponse
from django.shortcuts import get_object_or_404, render
from django.template.loader import select_template
from django.views.decorators.cache import cache_page
from django.views.generic import TemplateView, View

from .models import Facility, Instrument
from .oncat.facade import Catalog

logger = logging.getLogger(__name__)


class InstrumentMixin(object):
    '''
    Context enhancer
    mixin that sets the shared context variables:
    instrument
    ipts
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
        iptss = Catalog(facility, self.request).experiments(kwargs['instrument'])
        self.template_name = 'catalog/' + facility.lower() + '/' \
            + self.template_name
        context = super(IPTSs, self).get_context_data(**kwargs)
        context['iptss'] = iptss
        return context


class IPTSsAjax(LoginRequiredMixin, TemplateView):
    '''
    List of IPTSs for a given instrument as ajax
    '''

    def get(self, request, *args, **kwargs):

        logger.debug("Listing IPTSsAjax for: %s", kwargs['instrument'])
        
        instrument = get_object_or_404(Instrument, id=kwargs['instrument'])
        facility = get_object_or_404(Facility, id=kwargs['facility'])
        iptss = Catalog(facility.name, request).experiments(
            instrument.icat_name)
        logger.debug(pformat(iptss))
        return JsonResponse(iptss, status=200, safe=False)


class Runs(LoginRequiredMixin, InstrumentMixin, TemplateView):
    '''
    List of runs for a given instrument
    '''

    template_name = 'list_runs.html'

    def get_template_names(self):
        """
        Let's override this function.
        Returns a lits of pripority templates to render
        """
        facility = self.request.user.profile.instrument.facility.name.lower()
        instrument = self.kwargs['instrument'].lower()

        return [
            os.path.join('catalog', facility, instrument, self.template_name),
            os.path.join('catalog', facility, self.template_name),
            self.template_name
        ]

    def get_context_data(self, **kwargs):
        
        facility = self.request.user.profile.instrument.facility.name
        instrument = kwargs['instrument']
        ipts = kwargs['ipts']
        exp = kwargs.get('exp')
        logger.debug('Getting runs from catalog: %s %s %s %s',
                     facility, instrument, ipts, exp)
        runs = Catalog(facility, self.request).runs(instrument, ipts, exp)
        context = super(Runs, self).get_context_data(**kwargs)
        # logger.debug("Sent to template:\n%s", pformat(runs))
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
        run = Catalog(facility, self.request).run(instrument, ipts, filename)
        context = super(RunDetail, self).get_context_data(**kwargs)
        context['run'] = run
        return context
