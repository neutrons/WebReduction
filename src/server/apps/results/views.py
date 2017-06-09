
import numpy as np
import plotly.graph_objs as go
from plotly.offline import plot
from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import Http404
from django.views.generic import DetailView, ListView
from django_remote_submission.models import Job, Result
from django.contrib import messages

from server.apps.sans.models import ModelMixin
import logging

logger = logging.getLogger(__name__)  # pylint: disable=C0103

# For the job details to share the same function as the sans models
Job.get_all_fields = ModelMixin.get_all_fields


class JobMixin(object):

    def get_queryset(self):
        '''
        Make sure the user only accesses its Jobs
        '''
        return Job.objects.filter(owner=self.request.user)


class JobsList(LoginRequiredMixin, JobMixin, ListView):
    template_name = 'results/job_list.html'


class JobDetail(LoginRequiredMixin, JobMixin, DetailView):

    template_name = 'results/job_detail.html'

    def get_queryset(self):
        queryset = super(JobDetail, self).get_queryset()
        return queryset.filter(id=self.kwargs['pk'])


class JobLiveLog(LoginRequiredMixin, JobMixin, DetailView):
    template_name = 'results/log_live.html'

    def get_queryset(self):
        queryset = super(JobLiveLog, self).get_queryset()
        return queryset.filter(id=self.kwargs['pk'])


#
# Results
#


def plot_sasview_iq(filepath):
    data = np.genfromtxt(filepath)

    x_data = data[:, [0]].flatten()
    y_data = data[:, [1]].flatten()
    e_data = data[:, [2]].flatten()
    trace1 = go.Scatter(
        x=x_data,
        y=y_data,
        error_y=dict(
            type='data',
            array=e_data,
            visible=True
        ),
        mode = 'lines+markers',
    )

    data = [trace1]
    layout = go.Layout(
        # autosize=False,
        width=800,
        height=800,

        xaxis=dict(
            type='log',
            autorange=True
        ),
        yaxis=dict(
            #type='log',
            autorange=True
        )
    )
    fig = go.Figure(data=data, layout=layout)
    plot_div = plot(fig, output_type='div', include_plotlyjs=False)
    return plot_div


class ResultPlot(LoginRequiredMixin, DetailView):

    model = Result

    template_name = 'results/result_plot.html'

    def get_object(self, queryset=None):
        """
        Hook to ensure object is owned by request.user.
        """
        result = super(ResultPlot, self).get_object()
        if not result.job.owner == self.request.user:
            raise Http404("The user {} is not the owner of {}.".format(
                self.request.user, result))
        return result

    def get_context_data(self, **kwargs):
        # Call the base implementation first to get a context
        context = super(ResultPlot, self).get_context_data(**kwargs)
        try:
            context['plot'] = plot_sasview_iq(self.object.local_file.path)
        except Exception as e:
            messages.error(
                self.request, "An exception occurred while trying to plot the \
                data: {0} :: {1}".format(type(e).__name__, str(e)))
        return context
