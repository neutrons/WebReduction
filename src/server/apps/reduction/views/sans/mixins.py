# SANS Mixin

import json
import logging
from django.contrib import messages
from server.apps.catalog.oncat.facade import Catalog

logger = logging.getLogger(__name__)  # pylint: disable=C0103

class SANSMixin(object):
    '''
    Mixin only used for the Reduction Form views
    '''

    def get_context_data(self, **kwargs):
        '''
        This will get from the catalog the data for this IPTS
        in form of a table.
        This is passed to the view as context variables: header and runs
        '''
        context = super(SANSMixin, self).get_context_data(**kwargs)

        facility_name = self.request.user.profile.instrument.facility.name
        instrument_catalog_name = self.request.user.profile.instrument.catalog_name
        ipts = self.request.user.profile.ipts
        exp = self.request.user.profile.experiment

        logger.debug('SANSMixin :: Populating the context with the \
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
            messages.warning(self.request, "An exception occurred while getting \
                data from the catalog: {0} :: {1}".format(type(e).__name__, str(e)))
            header = []
            runs = []
        context['runs'] = json.dumps(runs) # Converts dict to string and None to null: Good for JS
        context['header'] = header
        return context