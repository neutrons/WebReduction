from django.forms import ModelForm

from server.apps.configuration.models.spectrometry.sns.hyspec import Configuration
from server.apps.configuration.forms import abstract


class ConfigurationForm(abstract.ConfigurationForm, ModelForm):
    class Meta(ConfigurationForm.Meta):
        model = Configuration
