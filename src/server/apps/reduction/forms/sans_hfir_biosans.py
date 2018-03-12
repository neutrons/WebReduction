import logging
from pprint import pformat

from django.forms import ModelForm, inlineformset_factory

from server.apps.configuration.models import SansHfirBiosansConfiguration

from ..forms import ReductionForm, ReductionScriptForm, RegionForm
from ..models import SansHfirBiosansReduction, SansHfirBiosansRegion

logger = logging.getLogger(__name__)  # pylint: disable=C0103


class SansHfirBiosansReductionForm(ReductionForm, ModelForm):
    class Meta(ReductionForm.Meta):
        model = SansHfirBiosansReduction


class SansHfirBiosansReductionScriptForm(ReductionScriptForm, ModelForm):
    class Meta(ReductionScriptForm.Meta):
        model = SansHfirBiosansReduction


class SansHfirBiosansRegionForm(RegionForm, ModelForm):
    class Meta(RegionForm.Meta):
        model = SansHfirBiosansRegion


# New
SansHfirBiosansRegionInlineFormSetCreate = inlineformset_factory(
    SansHfirBiosansReduction,
    SansHfirBiosansRegion,
    form=SansHfirBiosansRegionForm,
    extra=2,
    can_delete=False
)

# Edit
SansHfirBiosansRegionInlineFormSetUpdate = inlineformset_factory(
    SansHfirBiosansReduction,
    SansHfirBiosansRegion,
    form=SansHfirBiosansRegionForm,
    extra=0,
    can_delete=False
)
