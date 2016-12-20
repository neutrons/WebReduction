'''
Created on Jan 8, 2016
@author: rhf
'''
from django.forms import ModelForm

from crispy_forms.helper import FormHelper
from crispy_forms.layout import Submit, Button, HTML, Div

from .models import BioSANSConfiguration, BioSANSReduction

class ConfigurationForm(ModelForm):

    def __init__(self, *args, **kwargs):
        super(ConfigurationForm, self).__init__(*args, **kwargs)
        self.helper = FormHelper(self)
        self.helper.form_class = 'form-horizontal'
        self.helper.layout.append(Submit('submit', 'Save'))
        self.helper.layout.append(Button('cancel', 'Cancel', css_class='btn-default', onclick="window.history.back()"))

    class Meta:
        model = BioSANSConfiguration
        exclude = ['user','instrument']

class ReductionForm(ModelForm):

    def __init__(self, *args, **kwargs):
        super(ReductionForm, self).__init__(*args, **kwargs)
        self.helper = FormHelper(self)
        self.helper.form_class = 'form-horizontal'
        # onsubmit="return load_table();"
        self.helper.attrs = {'onsubmit' : "return load_table();"}
        # Anchor for handson table <div id="entries"></div>
        self.helper.layout.append(HTML('<div id="entries"></div>'))
        # Hidden field to keep content of tables.
        self.helper.layout.append(HTML('<input type="hidden" id="entries_hidden" name="entries_hidden" value="">'))
        self.helper.layout.append(Submit('submit', 'Save'))
        self.helper.layout.append(Button('cancel', 'Cancel', css_class='btn-default', onclick="window.history.back()"))

    class Meta:
        model = BioSANSReduction
        fields = '__all__'
