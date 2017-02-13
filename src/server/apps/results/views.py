
from django.contrib.auth.mixins import LoginRequiredMixin
from django_remote_submission.models import Job
from django.views.generic import ListView, DetailView

from server.apps.sans.models import ModelMixin

# For the job details to share the same function as yhe sans models
Job.get_all_fields = ModelMixin.get_all_fields

class JobMixin(object):

    def get_queryset(self):
        '''
        Make sure the user only accesses its Jobs
        '''
        return Job.objects.filter(owner=self.request.user)

class JobsList(LoginRequiredMixin, JobMixin, ListView):
    '''

    '''
    template_name = 'results/job_list.html'

class JobDetail(LoginRequiredMixin, JobMixin, DetailView):
    '''
    Detail of a configuration
    '''
    template_name = 'results/job_detail.html'
    
    def get_queryset(self):
        queryset = super(JobDetail, self).get_queryset()
        return queryset.filter(id=self.kwargs['pk'])
