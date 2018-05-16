import logging

from django.forms import ModelForm, inlineformset_factory

from crispy_forms.layout import HTML, Div

from server.apps.reduction.models.spectrometry.sns.hyspec import Reduction, Region
from server.apps.reduction.forms import abstract


logger = logging.getLogger(__name__)  # pylint: disable=C0103


class ReductionForm(abstract.ReductionForm, ModelForm):
    def __init__(self, *args, **kwargs):
        super(ReductionForm, self).__init__(*args, **kwargs)
        # super().__init__(*args, **kwargs)

        # Cell
        self.helper[2:8].wrap(Div, css_class="col-md-2")
        self.helper[2:8].wrap_together(Div, css_class="row")
        # Vectors
        self.helper[3:5].wrap(Div, css_class="col-md-6")
        self.helper[3:5].wrap_together(Div, css_class="row")
        # # # Projections
        self.helper[4:7].wrap(Div, css_class="col-md-4")
        self.helper[4:7].wrap_together(Div, css_class="row")

    class Meta(abstract.ReductionForm.Meta):
        model = Reduction


class ReductionScriptForm(abstract.ReductionScriptForm, ModelForm):
    class Meta(abstract.ReductionScriptForm.Meta):
        model = Reduction


class RegionForm(abstract.RegionForm, ModelForm):
    def __init__(self, *args, **kwargs):
        # super(RegionForm, self).__init__(*args, **kwargs)
        super().__init__(*args, **kwargs)
        self.helper.template = 'bootstrap/table_inline_formset.html'

        # self.helper[2:6].wrap(Div, css_class="col-md-3")
        # self.helper[2:6].wrap_together(Div, css_class="row")

        # self.helper[3:7].wrap(Div, css_class="col-md-3")
        # self.helper[3:7].wrap_together(Div, css_class="row")

        # self.helper[4:7].wrap(Div, css_class="col-md-3")
        # self.helper[4:7].wrap_together(Div, css_class="row")

        # self.helper[5:8].wrap(Div, css_class="col-md-3")
        # self.helper[5:8].wrap_together(Div, css_class="row")

    class Meta(abstract.RegionForm.Meta):
        model = Region


# New
# pylint: disable=C0103
RegionInlineFormSetCreate = inlineformset_factory(
    Reduction,
    Region,
    form=RegionForm,
    extra=1,
    min_num=1,
    can_delete=True
)

# Edit
# pylint: disable=C0103
RegionInlineFormSetUpdate = inlineformset_factory(
    Reduction,
    Region,
    form=RegionForm,
    extra=0,
    min_num=1,
    can_delete=True
)
