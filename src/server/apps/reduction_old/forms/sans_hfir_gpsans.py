import logging
from pprint import pformat

from django.forms import ModelForm, inlineformset_factory

from server.apps.configuration.models import SansHfirGpsansConfiguration

from ..forms import ReductionForm, ReductionScriptForm
from ..models import SansHfirGpsansReduction, SansHfirGpsansRegion
from .sans import SansRegionForm

logger = logging.getLogger(__name__)  # pylint: disable=C0103


class SansHfirGpsansReductionForm(ReductionForm, ModelForm):
    class Meta(ReductionForm.Meta):
        model = SansHfirGpsansReduction


class SansHfirGpsansReductionScriptForm(ReductionScriptForm, ModelForm):
    class Meta(ReductionScriptForm.Meta):
        model = SansHfirGpsansReduction


class SansHfirGpsansRegionForm(SansRegionForm, ModelForm):
    class Meta(SansRegionForm.Meta):
        model = SansHfirGpsansRegion


# New
SansHfirGpsansRegionInlineFormSetCreate = inlineformset_factory(
    SansHfirGpsansReduction,
    SansHfirGpsansRegion,
    form=SansHfirGpsansRegionForm,
    extra=3,
    can_delete=False
)
# Edit
SansHfirGpsansRegionInlineFormSetUpdate = inlineformset_factory(
    SansHfirGpsansReduction,
    SansHfirGpsansRegion,
    form=SansHfirGpsansRegionForm,
    extra=0,
    can_delete=False)
