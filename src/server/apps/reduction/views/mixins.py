import json
import logging
import os
import re
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
from server.util.formsets import FormsetMixin
from server.util.path import import_class_from_module
from server.scripts.builder import ScriptBuilder

logger = logging.getLogger(__name__)  # pylint: disable=C0103


class ReductionMixin(object):
    '''
    '''

    # usefull
    facility_obj = None
    instrument_obj = None

    def dispatch(self, request, *args, **kwargs):
        '''
        Overload
        '''
        self.instrument_obj = self.request.user.profile.instrument
        self.facility_obj = self.instrument_obj.facility
        return super().dispatch(request, *args, **kwargs)

    def get_queryset(self):
        '''
        Make sure the user only accesses its configurations
        '''
        return self.model.objects.filter(user=self.request.user)

    # def get_context_data(self, **kwargs):
    #     context = super().get_context_data(**kwargs)
    #     logger.debug("Context:\n{}".format(pformat(context)))
    #     return context



class ReductionFormMixin(ReductionMixin, FormsetMixin):
    '''
    Mixin only used for the Reduction Form views
    '''

    def _get_script_builder(self):
        '''
        This function builds a script based on the request parameters
        Used only in the form
        '''
        return ScriptBuilder(
            self.model.objects.to_json(self.kwargs['pk']),
            self.request.user.profile.instrument,
            self.request.user.profile.ipts,
            self.request.user.profile.experiment
        )

    def get_form(self, form_class=None):
        '''
        When the configuration is in the main form (reduction) it makes sure
        that the user only see its configurations.
        '''
        form = super().get_form(form_class)
        if 'configuration' in form.fields:
            form.fields['configuration'].queryset = self.model_configuration.objects.filter(
                    user=self.request.user)
        return form

    def get_formset(self, form_class=None):
        '''
        When creating/editing a formset, this will make sure the user only sees
        itss own configurations
        '''
        logger.debug("ReductionMixin get_formset")
        formset = super().get_formset(form_class)  # instantiate using parent
        for form in formset:
            # If the configuration is in the formsets (SANS Instruments)
            if 'configuration' in form.fields:
                form.fields['configuration'].queryset = self.model_configuration.objects.filter(
                    user=self.request.user)
        return formset

#     def get_formset_kwargs(self):
#         '''
#         Sets the initial values for the regions formsets
#         '''
#         logger.debug("ReductionMixin get_formset_kwargs")
#         kwargs = super().get_formset_kwargs()
# #         kwargs.update({'initial' : [{'region': r[0]} for r in Region.REGION_CHOICES]})
#         return kwargs


class ReductionCreateMixin(ReductionFormMixin):

    def form_valid(self, form, formset):
        """
        Sets initial values which are hidden in the form
        """
        form.instance.user = self.request.user
        form.instance.instrument = self.request.user.profile.instrument
        return FormsetMixin.form_valid(self, form, formset)


class ReductionDeleteMixin(ReductionMixin):

    def get_object(self, queryset=None):
        """
        Hook to ensure object is owned by request.user.
        """
        obj = super().get_object()
        if not obj.user == self.request.user:
            raise Http404
        return obj

    def delete(self, request, *args, **kwargs):
        logger.debug("Deleting reduction %s", self.get_object())
        messages.success(request, 'Reduction %s deleted.' % (self.get_object()))
        return super().delete(request, *args, **kwargs)


class ReductionCloneMixin(ReductionFormMixin):
    '''
    Clones the Object Configuration. Keeps the same user
    '''

    def get_object(self, queryset=None):
        obj = self.model.objects.clone(self.kwargs['pk'])
        self.kwargs['pk'] = obj.pk
        messages.success(self.request, "Reduction '%s' cloned."
                                       " New id is '%s'." % (obj, obj.pk))
        return obj

    def get(self, request, *args, **kwargs):
        '''
        This is called first in the View
        However calling the super below, will do the default prodecure, i.e.,
        It will call the get_object which will clone the current reduction
        '''
        super().get(request, *args, **kwargs)
        return HttpResponseRedirect(
            reverse('reduction:update', kwargs={'pk': self.object.pk}))

class ReductionUpdateMixin(ReductionFormMixin):
    '''
    Edit a Reduction (The spreadsheet)
    '''
    def post(self, request, **kwargs):
        '''
        When the form is saved we fo back success_url: the reduction list
        When the form is posted through the button Run, it will be saved and
        redirected to the edit script view.
        if the form was posted with the run button, in the html:
        <button name="run" ...
        The script is generated from the data in the form and then the default
        procedure is followed by calling super
        '''
        if 'run' in self.request.POST:
            request.POST = request.POST.copy()
            script_builder = self._get_script_builder()
            try:
                request.POST['script'] = script_builder.build_script()
                self.success_url = reverse_lazy(
                    'reduction:script',
                    kwargs={'pk': kwargs['pk']},)
                logger.debug("Generated script. Going to: %s", self.success_url)
            except Exception as e:
                logger.exception(e)
                messages.error(
                    self.request,
                    "An exception occurred: {0} :: {1}".format(
                        type(e).__name__, str(e)))
        return super().post(request, **kwargs)