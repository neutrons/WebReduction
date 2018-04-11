import logging

from django.forms import ModelForm, inlineformset_factory

from server.apps.reduction.models.spectrometry.sns.hyspec import Reduction, Region

from server.apps.reduction.forms import abstract


logger = logging.getLogger(__name__)  # pylint: disable=C0103


class ReductionForm(abstract.ReductionForm, ModelForm):
    class Meta(abstract.ReductionForm.Meta):
        model = Reduction


class ReductionScriptForm(abstract.ReductionScriptForm, ModelForm):
    class Meta(abstract.ReductionScriptForm.Meta):
        model = Reduction


class RegionForm(abstract.RegionForm, ModelForm):
    def __init__(self, *args, **kwargs):
        super(RegionForm, self).__init__(*args, **kwargs)
        self.helper.template = 'bootstrap/table_inline_formset.html'

    class Meta(abstract.RegionForm.Meta):
        model = Region


# New
# pylint: disable=C0103
RegionInlineFormSetCreate = inlineformset_factory(
    Reduction,
    Region,
    form=RegionForm,
    extra=1,
    can_delete=True
)

# Edit
# pylint: disable=C0103
RegionInlineFormSetUpdate = inlineformset_factory(
    Reduction,
    Region,
    form=RegionForm,
    extra=0,
    can_delete=True
)
