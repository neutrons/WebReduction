from .generic import (
    # ReductionMixin,
    ReductionList,
    ReductionDetail,
    # ReductionFormMixin,
    ReductionCreate,
    ReductionDelete,
    ReductionClone,
    ReductionUpdate,
    ReductionScriptUpdate,
)

from .spectrometry_sns_hyspec import SpectrometrySnsHyspecReductionCreate

__all__ = [
    # ReductionMixin,
    'ReductionList',
    'ReductionDetail',
    # ReductionFormMixin,
    'ReductionCreate',
    'ReductionDelete',
    'ReductionClone',
    'ReductionUpdate',
    'ReductionScriptUpdate',
    #
    'SpectrometrySnsHyspecReductionCreate',
]