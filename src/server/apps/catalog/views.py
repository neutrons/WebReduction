import logging
import os
import zipfile
from io import BytesIO

from pprint import pformat

from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import JsonResponse
from django.shortcuts import get_object_or_404, render
from django.template.loader import select_template
from django.views.decorators.cache import cache_page
from django.views.generic import TemplateView, View
from django.db import transaction
from django.contrib.auth.decorators import login_required
from server.apps.users.ldap_util import LdapSns
from django.conf import settings
from django.http import HttpResponseForbidden
from django.http import HttpResponse
from django.http import FileResponse
from django.urls import reverse

from django.http import HttpResponse
from .models import Facility, Instrument
from .oncat.facade import Catalog

logger = logging.getLogger(__name__)


class CatalogMixin(object):
    '''
    Context enhancer for the Catalog
    '''

    def dispatch(self, request, *args, **kwargs):
        '''
        First method being called
        Usefull for debug and set member variables
        '''
        # logger.debug('Token in session (starting the request):\n%s',
        #              pformat(request.session.get('token')))

        self.facility = self.request.user.profile.instrument.facility
        self.instrument = self.request.user.profile.instrument

        self.catalog = Catalog(
            facility=self.facility.name,
            technique=self.instrument.technique,
            instrument=self.instrument.catalog_name,
            request=self.request
        )

        return super(CatalogMixin, self).dispatch(request, *args, **kwargs)

    def get_template_names(self):
        """
        Let's override this function.
        Returns a list of priority templates to render. From specific to general.
        facility/instrument/self.template
        facility/self.template
        self.template
        Note that the method caling this must have self.template_name defined!!
        """

        facility_name = self.facility.name.lower()
        instrument_name = self.instrument.name.lower()

        return [
            os.path.join('catalog', facility_name, instrument_name, self.template_name),
            os.path.join('catalog', facility_name, self.template_name),
            os.path.join('catalog', self.template_name),
        ]


class IPTSs(LoginRequiredMixin, CatalogMixin, TemplateView):
    '''
    List of IPTSs
    '''
    template_name = 'list_iptss.html'

    def get_context_data(self, **kwargs):
        logger.debug("Listing IPTSs for: {}".format(self.catalog))
        iptss = self.catalog.experiments()
        context = super(IPTSs, self).get_context_data(**kwargs)
        context['iptss'] = iptss
        # logger.debug("Catalog returned:\n%s", pformat(iptss))
        return context

class IPTSsAjax(LoginRequiredMixin, TemplateView):
    '''
    List of RUNS for a given ipts as ajax
    '''

    def get(self, request, *args, **kwargs):

        instrument_id = kwargs['intrument_id']
        instrument_obj = Instrument.objects.get(id=instrument_id)
        facility_obj = instrument_obj.facility


        facility = facility_obj
        instrument = instrument_obj

        catalog = Catalog(
            facility=facility.name,
            technique=instrument.technique,
            instrument=instrument.catalog_name,
            request=self.request
        )

        iptss = catalog.experiments()
        iptss_filtered = [ {k: v for k, v in ipts.items() if k in [
            "exp", "ipts", "title"
        ]} for ipts in iptss]
        return JsonResponse(iptss_filtered, status=200, safe=False)

class Runs(LoginRequiredMixin, CatalogMixin, TemplateView):
    '''
    List of runs for a given instrument
    '''

    template_name = 'list_runs.html'

    def get_context_data(self, **kwargs):
        ipts = kwargs['ipts']
        exp = kwargs.get('exp')
        logger.debug('Getting runs from catalog: %s', self.catalog)
        runs = self.catalog.runs(ipts, exp)
        context = super(Runs, self).get_context_data(**kwargs)
        # logger.debug("Sent to template:\n%s", pformat(runs))
        context['runs'] = runs
        return context


class RunsAjax(LoginRequiredMixin, CatalogMixin, TemplateView):
    '''
    List of RUNS for a given ipts as ajax
    '''

    def get(self, request, *args, **kwargs):

        ipts = kwargs['ipts']
        exp = kwargs.get('exp')
        logger.debug("Listing RunsAjax for: %s -> %s %s",
                     self.catalog, ipts, exp)
        runs = self.catalog.runs(ipts, exp)
        # Let's filter the catalog results and just provide a subset of data"
        runs_out = [
            {
                'url': reverse('catalog:run_file', kwargs={
                    'ipts': ipts,
                    'exp': exp,
                    'filename': r['location'],
                }),
                'scan': r['metadata']['scan'],
                'scan_title': r['metadata']['scan_title'],
            } for r in runs if 'metadata' in r
        ]

        # runs_out = []
        # for r in runs:
        #     print(80*"*", r)
        #     runs_out.append(
        #         {
        #             'url': reverse('catalog:run_file', kwargs={
        #                 'ipts': ipts,
        #                 'exp': exp,
        #                 'filename': r['location'],
        #             }),
        #             'scan': r['metadata']['scan'],
        #             'scan_title': r['metadata']['scan_title'],
        #         }
        #     )

        # logger.debug(pformat(iptss))
        return JsonResponse(runs_out, status=200, safe=False)


class RunDetail(LoginRequiredMixin, CatalogMixin, TemplateView):
    '''
    Detail of run
    '''

    template_name = 'run_detail.html'

    def get_context_data(self, **kwargs):

        ipts = kwargs['ipts']
        exp = kwargs.get('exp')
        filename = kwargs['filename']
        logger.debug('Getting run detail from catalog: %s %s %s %s',
                     self.catalog, ipts, exp, filename)
        run = self.catalog.run(ipts, filename)
        context = super(RunDetail, self).get_context_data(**kwargs)
        context['run'] = run
        return context


class RunDetailAjax(LoginRequiredMixin, CatalogMixin, TemplateView):
    '''
    Get the run detail but in ajax format
    '''

    def get(self, request, *args, **kwargs):

        ipts = kwargs['ipts']
        exp = kwargs.get('exp')
        filename = kwargs['filename']
        logger.debug('Getting run detail from catalog: %s %s %s %s',
                     self.catalog, ipts, exp, filename)
        run = self.catalog.run(ipts, filename)
        run.pop('data', None)
        return JsonResponse(run, status=200, safe=False)


class RunFile(LoginRequiredMixin, CatalogMixin, TemplateView):
    '''
    Raw File for a run
    Downloadable as attachment
    It first verifies if the user has permissions
    '''

    def get(self, request, *args, **kwargs):
        ipts = kwargs['ipts']
        filename = kwargs['filename']
        logger.debug("RunFile: Fetching file: %s", filename)

        all_groups_for_this_user = list(
            request.user.groups.values_list('name', flat=True))

        if ipts not in all_groups_for_this_user \
                and self.instrument.ldap_group_name not in all_groups_for_this_user \
                and settings.LDAP_ADMIN_GROUP not in all_groups_for_this_user:
            logger.error("User {} belongs to groups: {}."
                         " It has no permission to see {}.".format(
                    request.user, all_groups_for_this_user, ipts
                )
            )
            return HttpResponseForbidden()

        response = FileResponse(open(filename, 'rb'))
        response['Content-Disposition'] = "attachment; filename={}".format(filename)
        # wrapper = FileWrapper(open(filename))
        # response = HttpResponse(wrapper, content_type='text/plain')
        # response['Content-Length'] = os.path.getsize(filename)
        return response



class IptsZip(LoginRequiredMixin, CatalogMixin, TemplateView):
    '''
    Zip the IPTS folder and return it as
    '''

    def _zipdir(self, path, zip_handler):
        '''
        ziph is zipfile handle
        '''
        for root, dirs, files in os.walk(path):
            for file in files:
                abs_path_to_zip = os.path.join(root, file)
                zip_handler.write(
                    abs_path_to_zip,
                    os.path.relpath(abs_path_to_zip, path)
                )

    def get(self, request, *args, **kwargs):

        ipts = kwargs['ipts']
        exp = kwargs.get('exp')

        path = os.path.join(
            self.instrument.drive_path,
            ipts,
            exp if exp is not None else "",
        )

        logger.debug("Zipping the path: {}".format(path))
        zip_filename = ipts + "_{}.zip".format(exp) if exp else ".zip"

        # Open BytesIO to grab in-memory ZIP contents
        s = BytesIO()
        zip_file = zipfile.ZipFile(s, 'w')
        self._zipdir(path, zip_file)
        zip_file.close()

        # Grab ZIP file from in-memory, make response with correct MIME-type
        response = HttpResponse(s.getvalue(), content_type='application/zip')
        # ..and correct content-disposition
        response['Content-Disposition'] = 'attachment; filename=%s' % zip_filename
        return response