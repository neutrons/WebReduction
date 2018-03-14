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

    # Django stuff
    model = None
    model_configuration = None
    form_class = None
    formset_class = None

    # usefull
    facility_obj = None
    instrument_obj = None

    def dispatch(self, request,
                 form_to_use=["Reduction", "Form"],
                 formset_to_use=["Region", "Inline", "Form", "Set", "Create"],
                 *args, **kwargs):
        '''
        Overload
        '''
        # if request.method == 'POST':
        #     logger.debug("ReductionMixin dispatch POST content:\n%s", pformat(request.POST.dict()))

        self.instrument_obj = self.request.user.profile.instrument
        self.facility_obj = self.instrument_obj.facility

        #  Models
        self.model = import_class_from_module(
            "server.apps.reduction.models", self.facility_obj,
            self.instrument_obj, "Reduction")
        logger.debug("Model = {}".format(self.model))

        self.model_configuration = import_class_from_module(
            "server.apps.configuration.models", self.facility_obj,
            self.instrument_obj, "Configuration")
        logger.debug("Model Configuration = {}".format(self.model_configuration))

        #  Forms
        self.form_class = import_class_from_module(
            "server.apps.reduction.forms", self.facility_obj,
            self.instrument_obj, form_to_use)
        logger.debug("Form = {}".format(self.form_class))

        self.formset_class = import_class_from_module(
            "server.apps.reduction.forms", self.facility_obj,
            self.instrument_obj, formset_to_use)
        logger.debug("FormSet = {}".format(self.formset_class))

        return super(ReductionMixin, self).dispatch(request, *args, **kwargs)

    def get_queryset(self):
        '''
        Make sure the user only accesses its configurations
        '''
        return self.model.objects.filter(user=self.request.user)


    def get_formset(self, form_class=None):
        '''
        When creating/editing a formset, this will make sure the user only sees it's own
        configurations
        '''
        logger.debug("ReductionMixin get_formset")
        formset = super(ReductionMixin, self).get_formset(form_class)  # instantiate using parent
        for form in formset:
            # If the configuration is in the formsets (SANS Instruments)
            if 'configuration' in form.fields:
                form.fields['configuration'].queryset = self.model_configuration.objects.filter(
                    user=self.request.user)
        return formset

    def get_formset_kwargs(self):
        '''
        Sets the initial values for the regions formsets
        '''
        logger.debug("ReductionMixin get_formset_kwargs")
        kwargs = super(ReductionMixin, self).get_formset_kwargs()
#         kwargs.update({'initial' : [{'region': r[0]} for r in Region.REGION_CHOICES]})
        return kwargs

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
            os.path.join('reduction', technique_name, facility_name,
                         instrument_name, self.template_name),
            os.path.join('reduction', technique_name, facility_name,
                         self.template_name),
            os.path.join('reduction', technique_name, self.template_name),
            os.path.join('reduction', self.template_name),
        ]

#
# Reductions
#


class ReductionList(LoginRequiredMixin, ReductionMixin, ListView):
    '''
    List all Reduction.
    '''
    template_name = 'list.html'


class ReductionDetail(LoginRequiredMixin, ReductionMixin, DetailView):
    '''
    Detail of a Reduction
    A Reduction is a title and a set of entries.
    The entries are an hidden field : id="entries_hidden"
    Which are an Handsontable
    '''
    template_name = 'detail.html'



def call_subclass(some_function):

    def wrapper(*args, **kwargs):
        logger.debug("****** Wrapper *******")
        logger.debug(args)
        logger.debug(kwargs)
        v = args[0]  # self
        logger.debug(v.instrument_obj)

        subclass_found = import_class_from_module(
            "server.apps.reduction.views", v.facility_obj,
            v.instrument_obj,
            # Split by uppercase
            re.findall('[A-Z][a-z]*',type(v).__name__))

        if subclass_found:
            logger.debug("Found class: {}".format(subclass_found))

            # this_class = globals()[type(v).__name__]
            # for subclass in this_class.__subclasses__():
            v.__class__ = subclass_found

            method_to_call = getattr(v, some_function.__name__, None)
            if method_to_call is not None:
                return method_to_call(*tuple(args[1:]), **kwargs)
        return some_function(*args, **kwargs)

    return wrapper


class ReductionFormMixin(ReductionMixin):
    '''
    Mixin only used for the Reduction Form views
    '''

    @call_subclass
    def get_context_data(self, **kwargs):
        '''
        This will get from the catalog the data for this IPTS
        in form of a table.
        This is passed to the view as context variables: header and runs
        '''
        context = super(ReductionFormMixin, self).get_context_data(**kwargs)
        facility_name = self.request.user.profile.instrument.facility.name
        instrument_catalog_name = self.request.user.profile.instrument.catalog_name
        ipts = self.request.user.profile.ipts
        exp = self.request.user.profile.experiment

        logger.debug('ReductionFormMixin :: Populating the context with the \
                      catalog: %s %s %s %s',
                     facility_name, instrument_catalog_name, ipts, exp)
        try:
            header, runs = Catalog(
                facility=facility_name,
                technique=self.request.user.profile.instrument.technique,
                instrument=instrument_catalog_name,
                request=self.request
            ).runs_as_table(ipts, exp)
        except Exception as e:
            logger.warning("Catalog function get_runs_as_table failed %s", e)
            messages.warning(self.request, "An exception occurred while getting \
                data from the catalog: {0} :: {1}".format(type(e).__name__, str(e)))
            header = []
            runs = []
        context['runs'] = json.dumps(runs) # Converts dict to string and None to null: Good for JS
        context['header'] = header
        return context

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


class ReductionCreate(LoginRequiredMixin, ReductionFormMixin, FormsetMixin, CreateView):
    '''
    Create a new entry!
    '''
    template_name = 'form.html'
    success_url = reverse_lazy('reduction:list')

    def form_valid(self, form, formset):
        """
        Sets initial values which are hidden in the form
        """
        form.instance.user = self.request.user
        form.instance.instrument = self.request.user.profile.instrument
        return FormsetMixin.form_valid(self, form, formset)


class SpectrometrySnsHyspecReductionCreate(ReductionCreate):
    '''
    TEST
    '''
    def get_context_data(self, **kwargs):
        logger.debug("****** Wrapper :: get_context_data *******")
        context = super(CreateView, self).get_context_data(**kwargs)
        return context


class ReductionDelete(LoginRequiredMixin, ReductionMixin, DeleteView):

    template_name = 'confirm_delete.html'
    success_url = reverse_lazy('reduction:list')

    def get_object(self, queryset=None):
        """
        Hook to ensure object is owned by request.user.
        """
        obj = super(ReductionDelete, self).get_object()
        if not obj.user == self.request.user:
            raise Http404
        return obj

    def delete(self, request, *args, **kwargs):
        logger.debug("Deleting reduction %s", self.get_object())
        messages.success(request, 'Reduction %s deleted.' % (self.get_object()))
        return super(ReductionDelete, self).delete(request, *args, **kwargs)


class ReductionClone(LoginRequiredMixin, ReductionMixin, UpdateView):
    '''
    Clones the Object Configuration. Keeps the same user
    '''

    template_name = 'detail.html'

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
        super(ReductionClone, self).get(request, *args, **kwargs)
        return HttpResponseRedirect(
            reverse('reduction:update', kwargs={'pk': self.object.pk}))

class ReductionUpdate(LoginRequiredMixin, ReductionFormMixin, FormsetMixin, UpdateView):
    '''
    Edit a Reduction (The spreadsheet)
    '''
    template_name = 'form.html'
    success_url = reverse_lazy('reduction:list')

    def dispatch(self, request, *args, **kwargs):
        return super(ReductionUpdate, self).dispatch(
                request,
                formset_to_use=["Region", "Inline", "Form", "Set", "Update"],
                *args, **kwargs
            )

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
        return super(ReductionUpdate, self).post(request, **kwargs)


class ReductionScriptUpdate(LoginRequiredMixin, ReductionFormMixin, UpdateView):
    '''
    Edit a Reduction Script
    on GET:
    Generate the script and show it to the user
    on POST:
    - Save it
    - Save it and submit the job to the cluster
    '''
    template_name = 'script_form.html'
    success_url = reverse_lazy('reduction:list')

    def dispatch(self, request, *args, **kwargs):
        '''
        This only gets the form to use
        '''
        return super(
            ReductionScriptUpdate, self).dispatch(
                request,
                form_to_use=["Reduction", "Script", "Form"],
                *args, **kwargs)

    def get_object(self, queryset=None):
        '''
        We get the object already in the DB
        This is called by get and post
        Get:
        Generate the script (if the script field in the DB is empty!)
        and add it to object shown on the form
        It does the same for sript path. It should work HFIR and SNS
        '''
        logger.debug("ReductionScriptUpdate :: get_object")
        obj = super(ReductionScriptUpdate, self).get_object()

        # If we are generating the form fill in empty bits
        if self.request.method == 'GET':
            script_builder = self._get_script_builder()
            if obj.script is None or obj.script == "":
                # if the script does not exist, let's generate it!
                logger.debug("Generate the script for %s.", obj)
                try:
                    obj.script = script_builder.build_script()
                except Exception as e:
                    logger.exception(e)
                    messages.error(self.request, "An exception occurred: {0} ::\
                        {1}".format(type(e).__name__, str(e)))
            if obj.script_execution_path is None or obj.script_execution_path == "":
                obj.script_execution_path = script_builder.get_reduction_path()
        return obj

    def post(self, request, **kwargs):
        '''
        When the form is posted if we clicked in generate, it will
        regenerate the form and fill it in the respective field
        Note: We need to modify the previously posted form (POST)!
        '''
        if 'generate' in self.request.POST:
            request.POST = request.POST.copy()
            script_builder = self._get_script_builder()
            try:
                request.POST['script'] = script_builder.build_script()
            except Exception as e:
                logger.exception(e)
                messages.error(self.request, "An exception occurred: {0} :: \
                    {1}".format(type(e).__name__, str(e)))
                return super(ReductionScriptUpdate, self).get(request, **kwargs)
        return super(ReductionScriptUpdate, self).post(request, **kwargs)

    def form_valid(self, form):
        """
        If the form is valid this is called!
        Checks what kind of button was pressed
        """

        if 'save' in self.request.POST:
            messages.success(self.request, "Reduction script saved.")
            self.success_url = reverse_lazy('reduction:detail',
                                            args=[self.kwargs['pk']])
        elif 'generate' in self.request.POST:
            messages.success(self.request, "Reduction script re-generated from scratch.")
            self.success_url = reverse_lazy('reduction:script',
                                            args=[self.kwargs['pk']])
        else:
            try:
                server_name = env("JOB_SERVER_NAME")
                server = get_object_or_404(Server, title=server_name)
                job = Job.objects.create(
                    title=form.instance.title,
                    program=form.instance.script,
                    remote_directory=form.instance.script_execution_path,
                    remote_filename="reduction_" + datetime.now().strftime("%Y%m%d-%H%M%S.%f") + ".py",
                    server=server,
                    owner=self.request.user,
                    interpreter=form.instance.script_interpreter,
                )
                form.instance.job = job

                password_encrypted = self.request.session["password"]
                password = signing.loads(password_encrypted)
                submit_job_to_server.delay(
                    job.pk,
                    password=password,
                    log_policy=LogPolicy.LOG_LIVE,
                    store_results=["*.txt"],
                    remote=True,
                )
                messages.success(
                    self.request,
                    "Reduction submitted to the cluster. See status: \
                    <a href='%s'> here </a>" % reverse_lazy(
                        "results:job_log_live",
                        args=[job.pk])
                )
            except Exception as e:
                logger.exception(e)
                messages.error(self.request, "Reduction not submitted to the cluster. \
                    An exception occurred: {0} :: \
                    {1}".format(type(e).__name__, str(e)))
        return super(ReductionScriptUpdate, self).form_valid(form)
