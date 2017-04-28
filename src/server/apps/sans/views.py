import json
import logging
import os
from datetime import datetime
from pprint import pformat

from django.contrib import messages
from django.contrib.auth.mixins import LoginRequiredMixin
from django.core.urlresolvers import reverse_lazy
from django.http import Http404
from django.shortcuts import get_object_or_404
from django.views.generic import (CreateView, DeleteView, DetailView, ListView,
                                  TemplateView, UpdateView)
from django_remote_submission.models import Job, Server
from django_remote_submission.tasks import LogPolicy, submit_job_to_server

from server.apps.catalog.icat.facade import get_expriments, get_runs
from server.apps.catalog.models import Instrument
from server.apps.users.ldap_util import LdapSns
from server.settings.env import env
from server.util import script
from server.util.formsets import FormsetMixin

from .biosans.forms import (BioSANSConfigurationForm, BioSANSReductionForm,
                            BioSANSReductionScriptForm, BioSANSRegionForm,
                            BioSANSRegionInlineFormSetCreate,
                            BioSANSRegionInlineFormSetUpdate)
from .biosans.models import (BioSANSConfiguration, BioSANSReduction,
                             BioSANSRegion)
# GPSANS imports
from .gpsans.forms import (GPSANSConfigurationForm, GPSANSReductionForm,
                           GPSANSReductionScriptForm, GPSANSRegionForm,
                           GPSANSRegionInlineFormSetCreate,
                           GPSANSRegionInlineFormSetUpdate)
from .gpsans.models import GPSANSConfiguration, GPSANSReduction, GPSANSRegion

logger = logging.getLogger(__name__)


class SANSMixin(object):
    '''
    Base for all the Instruments
    '''
    params = {
        "EQSANS": {

        },
        "BioSANS": {
            "models":
            {
                "configuration": BioSANSConfiguration,
                "reduction": BioSANSReduction,
                "region": BioSANSRegion,
            },
            "forms":
            {
                "configuration": BioSANSConfigurationForm,
                "reduction": BioSANSReductionForm,
                "reduction_script": BioSANSReductionScriptForm,
                "region_formset_create": BioSANSRegionInlineFormSetCreate,
                "region_formset_update": BioSANSRegionInlineFormSetUpdate,
            },
        },
        "GPSANS": {
            "models":
            {
                "configuration": GPSANSConfiguration,
                "reduction": GPSANSReduction,
                "region": GPSANSRegion,
            },
            "forms":
            {
                "configuration": GPSANSConfigurationForm,
                "reduction": GPSANSReductionForm,
                "reduction_script": GPSANSReductionScriptForm,
                "region_formset_create": GPSANSRegionInlineFormSetCreate,
                "region_formset_update": GPSANSRegionInlineFormSetUpdate,
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

#
# Mixin for configuration
#


class ConfigurationMixin(SANSMixin):
    '''
    Sets everything for configuration
    When the form_class is defined the model is only used if needed!
    '''
    model = None
    form_class = None

    def dispatch(self, request, *args, **kwargs):
        '''
        Overload
        '''
        self._set_instrument_name(request)
        self.model = self.params[self.instrument_name]["models"]["configuration"]
        self.form_class = self.params[self.instrument_name]["forms"]["configuration"]
        return super(ConfigurationMixin, self).dispatch(request, *args, **kwargs)

    def get_queryset(self):
        '''
        Make sure the user only accesses its configurations
        '''
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
        form.instance.instrument = get_object_or_404(Instrument,
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
        logger.debug("Deleting Configuration %s " % self.get_object())
        messages.success(request,
                         'Configuration %s deleted.' % self.get_object())
        return super(ConfigurationDelete, self).delete(request, *args, **kwargs)


class ConfigurationClone(LoginRequiredMixin, ConfigurationMixin, DetailView):
    '''
    Clones the Object Configuration. Keeps the same user
    '''

    template_name = 'sans/configuration_detail.html'

    def get_object(self):
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
        this_instrument_ipts = get_expriments(
            facility=self.request.user.profile.instrument.facility.name,
            instrument=self.request.user.profile.instrument.icat_name
        )
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
        this_instrument_ipts = get_expriments(
            facility=self.request.user.profile.instrument.facility.name,
            instrument=self.request.user.profile.instrument.icat_name
        )
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
        kwargs = super(ReductionMixin,self).get_formset_kwargs()
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

    def get_queryset(self):
        '''
        Get only reductions for this user: reduction.configuration.user
        '''
        queryset = super(ReductionDetail, self).get_queryset()
        return queryset.filter(id=self.kwargs['pk'])

class ReductionFormMixin(ReductionMixin):
    def get_context_data(self, **kwargs):
        '''
        Get RUNs from the catalog
        '''
        logger.debug("ReductionFormMixin get_context_data")
        context = context = super(ReductionFormMixin, self).get_context_data(**kwargs)
        facility = self.request.user.profile.instrument.facility.name
        instrument = self.request.user.profile.instrument.icat_name
        ipts = self.request.user.profile.ipts
        exp = "exp{}".format(self.request.user.profile.experiment_number)
        logger.debug('Getting runs from catalog: %s %s %s %s', facility, instrument, ipts, exp )
        try:
            runs = get_runs(facility, instrument, ipts, exp)
        except Exception:
            runs = []
        context['runs'] = json.dumps(runs) #Converts dict to string and None to null: Good for JS
        return context

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
        logger.debug("ReductionCreate form_valid")
        form.instance.user = self.request.user
        form.instance.instrument = get_object_or_404(Instrument,name=self.instrument_name)
        return FormsetMixin.form_valid(self, form, formset)


class ReductionUpdate(LoginRequiredMixin, ReductionFormMixin, FormsetMixin, UpdateView):
    '''
    Edit a Reduction
    '''
    template_name = 'sans/reduction_form.html'
    success_url = reverse_lazy('sans:reduction_list')


    def dispatch(self, request, *args, **kwargs):
        return super(ReductionUpdate,
                     self).dispatch(request,formset_to_use = "region_formset_update",
                                    *args, **kwargs)

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
        messages.success(request, 'Reduction %s deleted.'%(self.get_object()))
        return super(ReductionDelete, self).delete(request, *args, **kwargs)


class ReductionClone(LoginRequiredMixin, ReductionMixin, DetailView):
    '''
    Clones the Object Configuration. Keeps the same user
    '''

    template_name = 'sans/reduction_detail.html'

    def get_object(self):
        obj = self.model.objects.clone(self.kwargs['pk'])
        self.kwargs['pk'] = obj.pk
        messages.success(self.request, "Reduction '%s' cloned. New id is '%s'. Click Edit below to change it."%(obj, obj.pk))
        return obj


class ReductionScriptUpdate(LoginRequiredMixin, ReductionMixin, UpdateView):
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
        Generate the script (if the script field in the DB is empty!)
        and add it to object shown on the form
        It does the same for sript path. It should work HFIR and SNS
        '''
        obj = super(ReductionScriptUpdate, self).get_object()
        # If we are generating thr form fill in empty bits
        if self.request.method == 'GET':
            if obj.script is None or obj.script == "":
                # if the script does not exist, let's generate it!
                logger.debug("Generate the script for %s.", obj)
                obj_json = self.model.objects.to_json(self.kwargs['pk'])
                #logger.debug(pformat(obj_json))
                python_script = script.build_script(
                    os.path.join(
                        os.path.dirname(
                            os.path.realpath(__file__)),
                        self.instrument_name.lower(),
                        "script.tpl"),
                    obj_json)
                obj.script = python_script
            if obj.script_execution_path is None or obj.script_execution_path == "":
                obj.script_execution_path = os.path.join(
                    self.request.user.profile.instrument.drive_path,
                    str(self.request.user.profile.ipts),
                    "exp-%s" % self.request.user.profile.experiment_number if \
                        self.request.user.profile.experiment_number > 0  else "",
                    "Shared", "AutoRedution"
                )
        logger.debug(obj.script)
        return obj

    def post(self, request, **kwargs):
        if 'generate' in self.request.POST:
            request.POST = request.POST.copy()
            obj_json = self.model.objects.to_json(self.kwargs['pk'])
            request.POST['script'] = script.build_script(
                os.path.join(
                    os.path.dirname(
                        os.path.realpath(__file__)),
                    self.instrument_name.lower(),
                    "script.tpl"),
                obj_json)
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
                submit_job_to_server.delay(
                    job.pk, password=self.request.session["password"],
                    log_policy=LogPolicy.LOG_LIVE,
                    store_results=["*.txt"])
                messages.success(self.request, "Reduction submitted to the cluster")
            except Exception as e:
                logger.exception(e)
                messages.error(self.request, "Reduction not submitted to the cluster: %s"%(str(e)))
        return super(ReductionScriptUpdate, self).form_valid(form)
