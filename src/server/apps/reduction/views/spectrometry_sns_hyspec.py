
import logging

from django.views.generic import (CreateView, )

from .generic import ReductionCreate


logger = logging.getLogger(__name__)  # pylint: disable=C0103

class SpectrometrySnsHyspecReductionCreate(ReductionCreate):
    '''
    TEST
    '''
    def get_context_data(self, **kwargs):
        logger.debug("****** Wrapper :: get_context_data *******")
        context = super(CreateView, self).get_context_data(**kwargs)
        return context