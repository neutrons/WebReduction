from django.forms import ModelForm

from ..models import SpectrometrySnsHyspecConfiguration
from .abstract import Configuration


class SpectrometrySnsHyspecConfiguration(Configuration, ModelForm):
    class Meta(Configuration.Meta):
        model = SpectrometrySnsHyspecConfiguration
