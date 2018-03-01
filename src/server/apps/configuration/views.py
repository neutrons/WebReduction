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


logger = logging.getLogger(__name__)  # pylint: disable=C0103


class ConfigurationMixin(LoginRequiredMixin):
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

    @staticmethod
    def import_from(module, name):
        '''
        MyClass = import_from("module.package", "MyClass")
        object = MyClass()
        '''
        module = __import__(module, fromlist=[name])
        return getattr(module, name)

    def dispatch(self, request, *args, **kwargs):
        '''
        Overload dispacth in all subclasses.
        Fisr method to be called in a View
        '''

        self.instrument_obj = self.request.user.profile.instrument

        self.form_class = self.params[self.instrument_name]["forms"]["configuration"]
        return super(ConfigurationMixin, self).dispatch(request, *args, **kwargs)

    def get_template_names(self):
        """
        Overload
        Returns a list of priority templates to render. From specific to general.
        facility/instrument/self.template
        facility/self.template
        self.template
        Note that the method caling this must have self.template_name defined!!
        """

        facility_name = self.facility.name.lower()
        instrument_name = self.instrument.name.lower()

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


class ConfigurationList(, ConfigurationMixin, ListView):
    '''
    List all configurations.
    Gets the query from the ConfigurationMixinModel
    No need for any definitions
    '''
    template_name = 'sans/configuration_list.html'


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


#
# Mixins for Reduction
#

class ReductionMixin(SANSMixin):
    '''
    Sets everything for configuration
    When the form_class is defined the model is only used if needed!
    '''
    model = None
    model_configuration = None
    form_class = None
    formset_class = None

    def dispatch(self, request,
                 form_to_use = "reduction", # or  "reduction_script"
                 formset_to_use = "region_formset_create", # or "region_formset_update"
                 *args, **kwargs):
        '''
        Overload
        '''
        # if request.method == 'POST':
        #     logger.debug("ReductionMixin dispatch POST content:\n%s", pformat(request.POST.dict()))

        self._set_instrument_name(request)
        self.model = self.params[self.instrument_name]["models"]["reduction"]
        self.model_configuration = self.params[self.instrument_name]["models"]["configuration"]
        self.form_class = self.params[self.instrument_name]["forms"][form_to_use]
        self.formset_class = self.params[self.instrument_name]["forms"][formset_to_use]
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
        formset = super(ReductionMixin,self).get_formset(form_class) #instantiate using parent
        for form in formset:
            form.fields['configuration'].queryset = self.model_configuration.objects.filter(user = self.request.user)
        return formset

    def get_formset_kwargs(self):
        '''
        Sets the initial values for the regions formsets
        '''
        logger.debug("ReductionMixin get_formset_kwargs")
        kwargs = super(ReductionMixin, self).get_formset_kwargs()
#         kwargs.update({'initial' : [{'region': r[0]} for r in Region.REGION_CHOICES]})
        return kwargs

#
# Reductions
#


class ReductionList(LoginRequiredMixin, ReductionMixin, ListView):
    '''
    List all Reduction.
    '''
    template_name = 'sans/reduction_list.html'


class ReductionDetail(LoginRequiredMixin, ReductionMixin, DetailView):
    '''
    Detail of a Reduction
    A Reduction is a title and a set of entries.
    The entries are an hidden field : id="entries_hidden"
    Which are an Handsontable
    '''
    template_name = 'sans/reduction_detail.html'


class ReductionFormMixin(ReductionMixin):
    '''
    Mixin only used for the Reduction Form views
    '''

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
            messages.error(self.request, "An exception occurred while getting \
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
    template_name = 'sans/reduction_form.html'
    success_url = reverse_lazy('sans:reduction_list')

    def form_valid(self, form, formset):
        """
        Sets initial values which are hidden in the form
        """
        form.instance.user = self.request.user
        form.instance.instrument = self.request.user.profile.instrument
        return FormsetMixin.form_valid(self, form, formset)


class ReductionDelete(LoginRequiredMixin, ReductionMixin, DeleteView):

    template_name = 'sans/reduction_confirm_delete.html'
    success_url = reverse_lazy('sans:reduction_list')

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

    template_name = 'sans/reduction_detail.html'

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
            reverse('sans:reduction_update', kwargs={'pk': self.object.pk}))

class ReductionUpdate(LoginRequiredMixin, ReductionFormMixin, FormsetMixin, UpdateView):
    '''
    Edit a Reduction (The spreadsheet)
    '''
    template_name = 'sans/reduction_form.html'
    success_url = reverse_lazy('sans:reduction_list')

    def dispatch(self, request, *args, **kwargs):
        return super(
            ReductionUpdate,
            self
        ).dispatch(
            request,
            formset_to_use="region_formset_update",
            *args,
            **kwargs
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
                    'sans:reduction_script',
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
    template_name = 'sans/reduction_script_form.html'
    success_url = reverse_lazy('sans:reduction_list')

    def dispatch(self, request, *args, **kwargs):
        '''
        This only gets the form to use
        '''
        return super(
            ReductionScriptUpdate, self).dispatch(
                request,
                form_to_use="reduction_script",
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
        logger.debug("From ReductionScriptUpdate *******************************")
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
            self.success_url = reverse_lazy('sans:reduction_detail',
                                            args=[self.kwargs['pk']])
        elif 'generate' in self.request.POST:
            messages.success(self.request, "Reduction script re-generated from scratch.")
            self.success_url = reverse_lazy('sans:reduction_script',
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
