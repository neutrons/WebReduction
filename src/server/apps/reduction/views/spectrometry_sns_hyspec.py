
import logging

from django.views.generic import (CreateView, )

from .generic import ReductionCreate


logger = logging.getLogger(__name__)  # pylint: disable=C0103

class SpectrometrySnsHyspecReductionCreate(ReductionCreate):
    '''
    This is the ReductionCreate View specific for hyspec
    '''
    def get_context_data(self, **kwargs):
        context = super(CreateView, self).get_context_data(**kwargs)
        return context