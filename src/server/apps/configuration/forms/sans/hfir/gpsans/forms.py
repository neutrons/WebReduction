from django.forms import ModelForm

from ..models import SansHfirGpsansConfiguration
from .abstract import ConfigurationForm

class SansHfirGpsansConfigurationForm(ConfigurationForm, ModelForm):
    class Meta(ConfigurationForm.Meta):
        model = SansHfirGpsansConfiguration
