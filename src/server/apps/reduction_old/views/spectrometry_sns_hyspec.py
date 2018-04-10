
import logging

from django.views.generic import (CreateView, UpdateView)

from .generic import (ReductionCreate, ReductionUpdate)


logger = logging.getLogger(__name__)  # pylint: disable=C0103

class SpectrometrySnsHyspecReductionCreate(ReductionCreate):
    '''
    This is the ReductionCreate View specific for hyspec
    '''
    def get_context_data(self, **kwargs):
        logger.debug("Calling specific get_context_data for SpectrometrySnsHyspecReductionCreate")
        context = super(CreateView, self).get_context_data(**kwargs)
        return context


class SpectrometrySnsHyspecReductionUpdate(ReductionUpdate):
    '''
    This is the ReductionCreate View specific for hyspec
    '''
    def get_context_data(self, **kwargs):
        logger.debug("Calling specific get_context_data for SpectrometrySnsHyspecReductionUpdate")
        context = super(UpdateView, self).get_context_data(**kwargs)
        return context