
from crispy_forms.bootstrap import FormActions
from crispy_forms.helper import FormHelper
from crispy_forms.layout import HTML, Button, Field, Fieldset, Layout, Submit
from django.forms import HiddenInput


class ConfigurationForm(object):
    '''
    This is an abstract form configuration for spectrometry
    Note that the `model` is missing thus this cannot be used
    '''

    def __init__(self, *args, **kwargs):
        super(ConfigurationForm, self).__init__(*args, **kwargs)
        self.helper = FormHelper(self)
        # self.helper.form_class = 'form-inline'
        self.helper.form_class = 'form-horizontal'
        self.helper.render_required_fields = True
        self.helper.form_tag = False

    class Meta:
        exclude = ['users', 'instrument']


class MaskForm(object):
    def __init__(self, *args, **kwargs):
        super(MaskForm, self).__init__(*args, **kwargs)
        self.helper = FormHelper(self)
        self.helper.form_class = 'form-horizontal'
        self.helper.render_required_fields = True
        self.helper.form_tag = False
        self.helper.render_hidden_fields = True
        self.helper.template = 'bootstrap/table_inline_formset.html'

    class Meta:
        fields = '__all__'
        #widgets = {'entries': HiddenInput()}
