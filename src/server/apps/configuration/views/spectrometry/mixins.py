from django.shortcuts import get_object_or_404

from server.util.formsets import FormsetMixin
from server.apps.catalog.models import Instrument

import logging

logger = logging.getLogger(__name__)


class ConfigurationCreateMixin(FormsetMixin):


    def form_valid(self, form, formset):
        """
        Sets initial values which are hidden in the form
        """
        logger.debug("form_valid from ConfigurationCreateMixin in spectrometry")
        form.instance.user = self.request.user
        form.instance.instrument = get_object_or_404(
            Instrument, name=self.instrument_obj.name)

        return FormsetMixin.form_valid(self, form, formset)
