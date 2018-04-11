import logging

from django.forms import ModelForm, inlineformset_factory

from server.apps.reduction.models.sans.hfir.biosans import Reduction, Region

from server.apps.reduction.forms import abstract
from server.apps.reduction.forms.sans import abstract as sans_abstract


logger = logging.getLogger(__name__)  # pylint: disable=C0103


class ReductionForm(abstract.ReductionForm, ModelForm):
    class Meta(abstract.ReductionForm.Meta):
        model = Reduction


class ReductionScriptForm(abstract.ReductionScriptForm, ModelForm):
    class Meta(abstract.ReductionScriptForm.Meta):
        model = Reduction


class RegionForm(sans_abstract.RegionForm, ModelForm):
    class Meta(sans_abstract.RegionForm.Meta):
        model = Region


# New
# pylint: disable=C0103
RegionInlineFormSetCreate = inlineformset_factory(
    Reduction,
    Region,
    form=RegionForm,
    extra=2,
    can_delete=False
)

# Edit
# pylint: disable=C0103
RegionInlineFormSetUpdate = inlineformset_factory(
    Reduction,
    Region,
    form=RegionForm,
    extra=0,
    can_delete=False
)
