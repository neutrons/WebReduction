from django.forms import ModelForm, inlineformset_factory

from server.apps.configuration.models.spectrometry.sns.hyspec import Configuration, Mask
from server.apps.configuration.forms.spectrometry import abstract as spectrometry_abstract


class ConfigurationForm(spectrometry_abstract.ConfigurationForm, ModelForm):
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
    can_delete=False
)

# Edit
# pylint: disable=C0103
MaskInlineFormSetUpdate = inlineformset_factory(
    Configuration,
    Mask,
    form=MaskForm,
    extra=0,
    can_delete=False
)