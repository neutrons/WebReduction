
from django.contrib.auth.mixins import LoginRequiredMixin
from django_remote_submission.models import Job
from django.views.generic import ListView

# Create your views here.



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
    
