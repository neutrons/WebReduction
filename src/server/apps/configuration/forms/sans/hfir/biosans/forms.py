
import logging
from pprint import pformat

from crispy_forms.layout import HTML, Div
from django.forms import ModelForm

from server.apps.configuration.models.sans.hfir.biosans import Configuration
from server.apps.configuration.forms import abstract


logger = logging.getLogger(__name__)  # pylint: disable=C0103


class ConfigurationForm(abstract.ConfigurationForm, ModelForm):
    def __init__(self, *args, **kwargs):
        super(SansHfirBiosansConfigurationForm, self).__init__(*args, **kwargs)
        self.helper.layout.insert(
            0,
            HTML("""<div class="alert alert-info">
                    <strong>Note: </strong> Two separate configurations have \
                    to be created for Main and Wing detector!.
                </div>"""))

        # Mask pixels:
        self.helper[6].wrap(Div, css_class="col-md-3")
        self.helper[7].wrap(Div, css_class="col-md-2 col-md-offset-1")  # Space between 1st and 2nd collumn
        self.helper[8:11].wrap(Div, css_class="col-md-2")
        self.helper[6:11].wrap_together(Div, css_class="row")

        # Sticthing Q
        self.helper[20:22].wrap(Div, css_class="col-md-6", style="padding-left:20px;")
        self.helper[20:22].wrap_together(Div, css_class="row")

    def clean(self):
        '''
        This is called when the form is submitted
        Any form validation must be done here!
        '''
        cleaned_data = super(SansHfirBiosansConfigurationForm, self).clean()
        logger.debug(pformat(cleaned_data))

        # Validate Qs for stiching data sets
        q_min = cleaned_data.get("stiching_q_min")
        q_max = cleaned_data.get("stiching_q_max")

        if (not q_min and not q_max) or (q_min and q_max):
            self.add_error('stiching_q_min', "Please fill only one of these two fields!")
            self.add_error('stiching_q_max', "Please fill only one of these two fields!")

        return cleaned_data

    class Meta(ConfigurationForm.Meta):
        model = Configuration
