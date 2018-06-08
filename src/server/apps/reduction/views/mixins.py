import json
import logging
import os
import re
from pprint import pformat

from django.contrib import messages
from django.contrib.auth import get_user_model
from django.contrib.auth.mixins import LoginRequiredMixin
from django.core import signing
from django.db import transaction
from django.http import Http404, HttpResponseRedirect
from django.shortcuts import get_object_or_404
from django.urls import reverse, reverse_lazy
from django.utils import timezone
from django.views.generic import (CreateView, DeleteView, DetailView, ListView,
                                  TemplateView, UpdateView)
from django_auth_ldap.backend import LDAPBackend
from django_remote_submission.models import Job, Server
from django_remote_submission.tasks import (LogPolicy, copy_job_to_server,
                                            submit_job_to_server)

from server.apps.catalog.oncat.facade import Catalog
from server.apps.users.ldap_util import LdapSns
from server.scripts.builder import ScriptBuilder
from server.settings.env import env
from server.util.formsets import FormsetMixin
from server.util.path import import_class_from_module

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
        return self.model.objects.filter(users=self.request.user)

    # def get_context_data(self, **kwargs):
    #     context = super().get_context_data(**kwargs)
    #     logger.debug("Context:\n{}".format(pformat(context)))
    #     return context



class ReductionFormMixin(ReductionMixin):
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
    
    def _assign_to_uids(self, form, uids):
        '''
        if it's assigned already do nothing
        if uid is not on the DB, populates it from the ldap
        '''

        user_objets = []
        for uid in uids:
            if not get_user_model().objects.filter(username=uid).exists():
                # this new_uid is not on the database
                logger.debug("UID {} does not exist. Getting it from LDAP.".format(uid))
                ldapobj = LDAPBackend()
                user = ldapobj.populate_user(uid)
                if not user:
                    logger.warning("UID {} does not exist in LDAP... Skipping it.".format(uid))
                else:
                    logger.debug("Appending User {} to the list.".format(user))
                    user_objets.append(user)
            else:
                user = get_user_model().objects.get(username=uid)
                user_objets.append(user)
        logger.debug("Adding to the form: {}.".format(user_objets))
        form.instance.users.add(*user_objets)
    

    def _assign_users_to_this_ipts(self, form):
        ldap_server = LdapSns()
        if form.instance.share_with_ipts:
            uids = ldap_server.get_all_uids_for_an_ipts(self.request.user.profile.ipts)
            if self.request.user.username not in uids:
                uids.append(self.request.user.username)
            form.save() # model needs to be sabed before inserting manytomany values
            logger.debug("Sharing this IPTS with other users. Assiging {} UIDs to this IPTS {}.".format(
                uids, self.request.user.profile.ipts,
            ))
            self._assign_to_uids(form, uids)
        else:
            logger.debug("NOT Sharing this IPTS with other users. Assiging {} UID to this IPTS {}.".format(
                self.request.user, self.request.user.profile.ipts,
            ))
            form.instance.users.clear()
            form.instance.users.add(self.request.user)
        return form


    def get_form(self, form_class=None):
        '''
        When the configuration is in the main form (reduction) it makes sure
        that the user only see its configurations.
        '''
        form = super().get_form(form_class)
        if 'configuration' in form.fields:
            form.fields['configuration'].queryset = self.model_configuration.objects.filter(
                    users=self.request.user)
        return form



class ReductionFormsetMixin(ReductionMixin, FormsetMixin):
    '''
    Mixin only used for the Reduction Form views
    '''

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
                    users=self.request.user)
        return formset

#     def get_formset_kwargs(self):
#         '''
#         Sets the initial values for the regions formsets
#         '''
#         logger.debug("ReductionMixin get_formset_kwargs")
#         kwargs = super().get_formset_kwargs()
# #         kwargs.update({'initial' : [{'region': r[0]} for r in Region.REGION_CHOICES]})
#         return kwargs



class ReductionCreateMixin(ReductionFormMixin, ReductionFormsetMixin):

    def form_valid(self, form, formset):
        """
        Sets initial values which are hidden in the form
        """
        form.instance.instrument = self.request.user.profile.instrument
        form = self._assign_users_to_this_ipts(form)
        return FormsetMixin.form_valid(self, form, formset)


class ReductionDeleteMixin(ReductionMixin):

    def get_object(self, queryset=None):
        """
        Hook to ensure object is owned by request.user.
        """
        obj = super().get_object()
        # reduction.users.filter(username=rhf.username)

        if self.request.user not in obj.users.all():
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

class ReductionUpdateMixin(ReductionFormMixin, ReductionFormsetMixin):
    # '''
    # Edit a Reduction (The spreadsheet)
    # '''
    # def post(self, request, **kwargs):
    #     '''
    #     When the form is saved we fo back success_url: the reduction list
    #     When the form is posted through the button Run, it will be saved and
    #     redirected to the edit script view.
    #     if the form was posted with the run button, in the html:
    #     <button name="run" ...
    #     The script is generated from the data in the form and then the default
    #     procedure is followed by calling super
    #     '''
    #     # if 'run' in self.request.POST:
    #     #     request.POST = request.POST.copy()
    #     #     script_builder = self._get_script_builder()
    #     #     try:
    #     #         request.POST['script'] = script_builder.build_script()
    #     #         self.success_url = reverse_lazy(
    #     #             'reduction:script',
    #     #             kwargs={'pk': kwargs['pk']},)
    #     #         logger.debug("Generated script. Going to: %s", self.success_url)
    #     #     except Exception as e:
    #     #         logger.exception(e)
    #     #         messages.error(
    #     #             self.request,
    #     #             "An exception occurred: {0} :: {1}".format(
    #     #                 type(e).__name__, str(e)))
    #     return super().post(request, **kwargs)
    
    def form_valid(self, form, formset):
        form = self._assign_users_to_this_ipts(form)
        return FormsetMixin.form_valid(self, form, formset)


class ReductionScriptUpdateMixin(ReductionFormMixin):
    '''
    Edit a Reduction Script
    on GET:
    Generate the script and show it to the user
    on POST:
    - Save it
    - Save it and submit the job to the cluster
    '''

    # I'm leaving this as global variables as this can be overloaded in the 
    # Intrument specific classes that inherit from this
    # Otherwise those are defaults
    remote_filename = "reduction_{}.py".format(timezone.now().strftime(
        r"%Y%m%d-%H%M%S"))
    log_policy=LogPolicy.LOG_LIVE
    store_results=["*.txt", "*.log"]

    def get_object(self, queryset=None):
        '''
        Always called has the script form is an edit form
        We get the object already in the DB. This is called by get and post:
        * on GET: Generate the script (if the script field in the DB is empty!)
        and add it to object shown on the form
        It does the same for script path.
        '''
        obj = super().get_object()
        logger.debug("ReductionScriptUpdateMixin :: get_object = {}".format(obj))
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
                return super().get(request, **kwargs)
        return super().post(request, **kwargs)


    def _create_job(self, form, server):
        '''
        Auxiliary function to create a job from a form
        '''
        job = Job.objects.create(
            title=form.instance.title,
            program=form.instance.script,
            remote_directory=form.instance.script_execution_path,
            remote_filename=self.remote_filename,
            server=server,
            owner=self.request.user,
            interpreter=form.instance.script_interpreter,
        )
        logger.debug("Job created. Remote file name = %s", self.remote_filename)
        return job
    
    def _get_remote_task(self, form):
        '''
        Based on the dropbox run_type selection calls one of the functions
        in the django-remote-submission
        Form run type
         (1, 'Copy and Execute the script'),
         (2, 'Copy the script'),
        '''
        functions = {
            1: submit_job_to_server,
            2: copy_job_to_server
        }
        run_type = form.instance.run_type
        return functions[run_type]


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
                
                job = self._create_job(form, server)
                form.instance.job = job

                password_encrypted = self.request.session["password"]
                password = signing.loads(password_encrypted)

                task = self._get_remote_task(form)
                logger.debug("Executing remotely: {}".format(task) )
                transaction.on_commit(
                    lambda:task.delay(
                        job.pk,
                        password=password,
                        log_policy=self.log_policy,
                        store_results=self.store_results,
                        remote=True,
                    )
                )
                messages.success(
                    self.request,
                    "Reduction submitted to the cluster. See status: \
                    <a href='%s'> here </a>" % reverse_lazy(
                        "results:job_log_live",
                        args=[job.pk]
                    )
                )
            except Exception as e:
                logger.exception(e)
                messages.error(self.request, "Reduction not submitted to the cluster. \
                    An exception occurred: {0} :: \
                    {1}".format(type(e).__name__, str(e)))
        return super().form_valid(form)
