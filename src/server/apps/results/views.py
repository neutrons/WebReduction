
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

    template_name = 'results/job_detail.html'

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
        try:
            context['plot'] = self.plot_sasview_multiple_iq(files_to_plot)
        except Exception as e:
            messages.error(
                self.request, "An exception occurred while trying to plot the \
                data: {0} :: {1}".format(type(e).__name__, str(e)))
        return context


    def plot_sasview_multiple_iq(self, files_to_plot):
        data_list = []
        for filepath in files_to_plot:
            data = np.genfromtxt(filepath)

            x_data = data[:, [0]].flatten()
            y_data = data[:, [1]].flatten()
            e_data = data[:, [2]].flatten()
            trace = go.Scatter(
                name = filepath.split('/')[-1],
                x=x_data,
                y=y_data,
                error_y=dict(
                    type='data',
                    array=e_data,
                    visible=True
                ),
                mode = 'lines+markers',
            )
            data_list.append(trace)


        layout = go.Layout(
            autosize=False,
            width=1024,
            height=800,

            xaxis=dict(
                #type='log',
                autorange=True
            ),
            yaxis=dict(
                #type='log',
                autorange=True
            )                                       
        )
        fig = go.Figure(data=data_list, layout=layout)
        plot_div = plot(fig, output_type='div', include_plotlyjs=False)
        return plot_div


class ZipFilesView(View):
    def post(self, request):

        from pprint import pprint
        pprint(request.POST)
        # Files (local path) to put in the .zip
        # FIXME: Change this (get paths from DB etc)
        filenames = ["/tmp/file1.txt", "/tmp/file2.txt"]

        # Folder name in ZIP archive which contains the above files
        # E.g [thearchive.zip]/somefiles/file2.txt
        # FIXME: Set this to something better
        zip_subdir = "somefiles"
        zip_filename = "%s.zip" % zip_subdir

        # Open StringIO to grab in-memory ZIP contents
        s = StringIO.StringIO()

        # The zip compressor
        zf = zipfile.ZipFile(s, "w")

        for fpath in filenames:
            # Calculate path for file in zip
            fdir, fname = os.path.split(fpath)
            zip_path = os.path.join(zip_subdir, fname)

            # Add file, at correct path
            zf.write(fpath, zip_path)

        # Must close zip for all contents to be written
        zf.close()

        # Grab ZIP file from in-memory, make response with correct MIME-type
        resp = HttpResponse(s.getvalue(), mimetype = "application/x-zip-compressed")
        # ..and correct content-disposition
        resp['Content-Disposition'] = 'attachment; filename=%s' % zip_filename

        return resp