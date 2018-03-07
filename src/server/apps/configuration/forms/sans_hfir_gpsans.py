from django.forms import ModelForm

from ..models import SansHfirGpsansConfiguration as m
from .abstract import Configuration

class SansHfirGpsansConfiguration(Configuration, ModelForm):
    class Meta(Configuration.Meta):
        model = m
