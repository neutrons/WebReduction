
import numpy as np
import plotly.graph_objs as go
from plotly.offline import plot
from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import Http404
from django.views.generic import DetailView, ListView
from django_remote_submission.models import Job, Result
from django.contrib import messages
import os
import zipfile
from io import StringIO
from django.views import View
from django.http import HttpResponse
from django.http import HttpResponseForbidden
from tempfile import NamedTemporaryFile
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


class JobLiveLog(LoginRequiredMixin, JobMixin, DetailView):
    template_name = 'results/log_live.html'

    def get_queryset(self):
        queryset = super(JobLiveLog, self).get_queryset()
        return queryset.filter(id=self.kwargs['pk'])

class JobDetail(LoginRequiredMixin, JobMixin, DetailView):

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

        facility_name = self.request.user.profile.instrument.facility.name.lower()
        instrument_name = self.request.user.profile.instrument.name.lower()
        technique_name = self.request.user.profile.instrument.technique.lower()
        return [
            os.path.join('results', technique_name, facility_name,
                         instrument_name, 'job_detail.html'),
            os.path.join('results', technique_name, facility_name,
                         'job_detail.html'),
            os.path.join('results', technique_name, 'job_detail.html'),
            os.path.join('results', 'job_detail.html'),
        ]


    def get_queryset(self):
        queryset = super(JobDetail, self).get_queryset()
        return queryset.filter(id=self.kwargs['pk'])

    def get_context_data(self, **kwargs):
        context = super(
            JobDetail,
            self).get_context_data(**kwargs)

        files_to_plot = [
            result.local_file.path for result in self.object.results.all()
        ]
        if len(files_to_plot) == 0:
            logger.warning("No files to plot!")
            context['plot'] = None
        else:
            try:
                context['plot'] = self.plot_sasview_multiple_iq(files_to_plot)
            except Exception as e:
                messages.error(
                    self.request, "An exception occurred while trying to plot the \
                    data: {0} :: {1}".format(type(e).__name__, str(e)))
                logger.exception(e)
        return context

    def plot_sasview_multiple_iq(self, files_to_plot):
        data_list = []
        for filepath in files_to_plot:
            with open(filepath, 'rb') as f:
                # Only way to read CVV and TSV
                clean_lines = (line.replace(b',', b'\t') for line in f)
                data = np.genfromtxt(
                    clean_lines,
                    delimiter="\t",
                    skip_header=2,
                    names=['X', 'Y', 'E', 'DX'],
                )
                # logger.debug(data)

                x_data = data['X']
                y_data = data['Y']
                e_data = data['E']
                trace = go.Scatter(
                    name=filepath.split('/')[-1],
                    x=x_data,
                    y=y_data,
                    error_y=dict(
                        type='data',
                        array=e_data,
                        visible=True
                    ),
                    mode='lines+markers',
                )
                data_list.append(trace)

        layout = go.Layout(
            autosize=False,
            width=1024,
            height=800,
            xaxis=dict(
                autorange=True
            ),
            yaxis=dict(
                autorange=True
            )
        )
        fig = go.Figure(data=data_list, layout=layout)
        plot_div = plot(fig, output_type='div', include_plotlyjs=False)
        return plot_div


class ZipFilesView(LoginRequiredMixin, JobMixin, View):
    def post(self, request):

        from pprint import pprint
        pprint(request.POST)

        ids_selected = request.POST['ids_selected']

        if ids_selected:
            ids_selected_arr = ids_selected.split(',')

        filenames = []
        for job_in in ids_selected_arr:
            r = Result.objects.get(id=job_in)
            if r.job.owner != request.user:
                return HttpResponseForbidden()
            filenames.append(r.local_file.path)

        zip_file = NamedTemporaryFile()
        with zipfile.ZipFile(zip_file.name, 'w') as myzip:
            for f in filenames:
                myzip.write(f, os.path.basename(f))

        resp = HttpResponse(
            zip_file.read(),
            content_type='application/zip'
        )
        return resp