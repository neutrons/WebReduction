from django.forms import ModelForm, inlineformset_factory
from crispy_forms.layout import HTML, Div

from server.apps.configuration.models.spectrometry.sns.hyspec import Configuration, Mask
from server.apps.configuration.forms.spectrometry import abstract as spectrometry_abstract


class ConfigurationForm(spectrometry_abstract.ConfigurationForm, ModelForm):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        # Cell
        self.helper[3:6].wrap(Div, css_class="col-md-4")
        self.helper[3:6].wrap_together(Div, css_class="row")

    class Meta(spectrometry_abstract.ConfigurationForm.Meta):
        model = Configuration

class MaskForm(spectrometry_abstract.MaskForm, ModelForm):
    class Meta(spectrometry_abstract.MaskForm.Meta):
        model = Mask

# New
# pylint: disable=C0103
MaskInlineFormSetCreate = inlineformset_factory(
    Configuration,
    Mask,
    form=MaskForm,
    extra=3,
    can_delete=True
)

# Edit
# pylint: disable=C0103
MaskInlineFormSetUpdate = inlineformset_factory(
    Configuration,
    Mask,
    form=MaskForm,
    extra=1,
    can_delete=True
)