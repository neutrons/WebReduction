import logging
from pprint import pformat

from django.contrib import messages
from django.core import signing
from django.db import transaction
from django.http import Http404, HttpResponseRedirect
from django.shortcuts import get_object_or_404
from django.urls import reverse, reverse_lazy
from django.utils import timezone
from django.views.generic import (CreateView, DeleteView, DetailView, ListView,
                                  TemplateView, UpdateView)

from django_remote_submission.models import Job, Server
from django_remote_submission.tasks import LogPolicy
import django_remote_submission.tasks

from server.apps.catalog.oncat.facade import Catalog
from server.apps.reduction.models.abstract import Actions
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
        form.save()  # ManyToMany needs save before
        # form.instance.users.clear()
        form.instance.users.add(self.request.user)
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


class ReductionShareMixin(ReductionMixin):

    def get_object(self, queryset=None):
        """
        
        """
        obj = super().get_object()        
        self.model.objects.share(
            obj.pk,
            self.request.user.profile.ipts)

        messages.success(
            self.request, 
            "Reduction '{}' among users {}.".format(
                obj, list(obj.users.values_list('username', flat=True))))

        return obj


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

    def form_valid(self, form, formset):
        return FormsetMixin.form_valid(self, form, formset)


class ReductionScriptUpdateMixin(ReductionFormMixin):
    '''
    Only does POST
    Generates the script
    Depending on actions chosen, selects:
        - template to use to generate the script
        - django remote submission task.

    '''

    # I'm leaving this as global variables as this can be overloaded in the 
    # Intrument specific classes that inherit from this
    # Otherwise those are defaults
    remote_filename = "reduction_{}.py".format(timezone.now().strftime(
        r"%Y%m%d-%H%M%S"))
    remote_directory_hash = "res_{}".format(timezone.now().strftime(
        r"%Y%m%d%H%M%S%f"))
    log_policy = LogPolicy.LOG_LIVE
    store_results = ["*.txt", "*.log"]

    def _get_script_builder(self, data, **kwargs):
        '''
        This function builds a script based on the request parameters        
        @param data is in json
        '''

        kwargs.update({
            'instrument_name': self.request.user.profile.instrument.name,
            'ipts_number': self.request.user.profile.ipts,
            'experiment_number': self.request.user.profile.experiment,
        })
        
        return ScriptBuilder(
            data,
            **kwargs,
        )
    
    def _create_remote_path(self, form):
        '''
        
        '''
        ipts = self.request.user.profile.ipts
        path_template = form.instance.action.destination_directory_path_template
        path = path_template % {
            'remote_directory_hash': self.remote_directory_hash,
            'ipts': ipts,
        }
        logger.debug("Job is going to executed in {}.".format(path))
        return path

    def _create_job(self, form, server):
        '''
        Auxiliary function to create a job from a form
        '''

        path = self._create_remote_path(form)

        job = Job.objects.create(
            title=form.instance.title,
            program=form.instance.script,
            remote_directory=path,
            remote_filename=self.remote_filename,
            server=server,
            owner=self.request.user,
            interpreter=form.instance.action.script_interpreter,
        )
        logger.debug("Job created. Remote file name = %s", self.remote_filename)
        return job
    
    def _get_remote_task(self, form):
        '''
        The Actions has the type of task to run as remote
        This returns from text in the DB the function
        '''
        task = form.instance.action.django_remote_submission_tasks
        logger.debug("Executing remotely the task {}.".format(task))

        method_to_call = getattr(django_remote_submission.tasks, task)
        return method_to_call


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
            form.save()  # Form needs to be saved before calling the manager below
            script_builder = self._get_script_builder(
                self.model.objects.to_json(self.kwargs['pk']),
                template_path=form.instance.action.script_template_path,
                script_execution_path=self._create_remote_path(form),
            )
            try:
                form.instance.script = script_builder.build_script()
                messages.success(self.request,
                                 "Reduction script successfully generated.")
            except Exception as e:
                logger.exception(e)
                messages.error(
                    self.request,
                    "An exception occurred while generating the script: "
                    "{0} :: {1}".format(type(e).__name__, str(e)))
            
            self.success_url = reverse_lazy('reduction:script',
                                            args=[self.kwargs['pk']])
        else:  # execute
            try:
                server_name = env("JOB_SERVER_NAME")
                server = get_object_or_404(Server, title=server_name)
                
                job = self._create_job(form, server)
                form.instance.job = job

                password_encrypted = self.request.session["password"]
                password = signing.loads(password_encrypted)

                task = self._get_remote_task(form)
                logger.debug("Executing remotely: {}".format(task) )
                # Only launches this if everything went well before!
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
