import logging

from django.forms import ModelForm, inlineformset_factory
from crispy_forms.layout import Submit, Button, Layout, Fieldset, HTML, Field

from server.apps.configuration.models import SpectrometrySnsHyspecConfiguration

from ..forms import ReductionForm, ReductionScriptForm, RegionForm
from ..models import SpectrometrySnsHyspecReduction, SpectrometrySnsHyspecRegion

logger = logging.getLogger(__name__)  # pylint: disable=C0103


class SpectrometrySnsHyspecReductionForm(ReductionForm, ModelForm):
    class Meta(ReductionForm.Meta):
        model = SpectrometrySnsHyspecReduction


class SpectrometrySnsHyspecReductionScriptForm(ReductionScriptForm, ModelForm):
    class Meta(ReductionScriptForm.Meta):
        model = SpectrometrySnsHyspecReduction


class SpectrometrySnsHyspecRegionForm(RegionForm, ModelForm):
    def __init__(self, *args, **kwargs):
        super(SpectrometrySnsHyspecRegionForm, self).__init__(*args, **kwargs)
        self.helper.template = 'bootstrap/table_inline_formset.html'

    class Meta(RegionForm.Meta):
        model = SpectrometrySnsHyspecRegion


# New
SpectrometrySnsHyspecRegionInlineFormSetCreate = inlineformset_factory(
    SpectrometrySnsHyspecReduction,
    SpectrometrySnsHyspecRegion,
    form=SpectrometrySnsHyspecRegionForm,
    extra=1,
    can_delete=True
)
# Edit
SpectrometrySnsHyspecRegionInlineFormSetUpdate = inlineformset_factory(
    SpectrometrySnsHyspecReduction,
    SpectrometrySnsHyspecRegion,
    form=SpectrometrySnsHyspecRegionForm,
    extra=0,
    can_delete=True)
