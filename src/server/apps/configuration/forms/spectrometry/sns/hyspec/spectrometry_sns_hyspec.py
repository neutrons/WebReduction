from django.forms import ModelForm

from ..models import SpectrometrySnsHyspecConfiguration
from .abstract import ConfigurationForm


class SpectrometrySnsHyspecConfigurationForm(ConfigurationForm, ModelForm):
    class Meta(ConfigurationForm.Meta):
        model = SpectrometrySnsHyspecConfiguration
