'''
Created on Jan 8, 2016
@author: rhf
'''
from django.forms import ModelForm
from django.forms import inlineformset_factory

from crispy_forms.helper import FormHelper
from crispy_forms.layout import Submit, Button, HTML, Div, Layout

from .models import BioSANSConfiguration, BioSANSReduction, BioSANSRegion

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


'''

See: https://github.com/runekaagaard/django-crispy-forms-fancy-formsets

https://github.com/runekaagaard/django-crispy-forms-fancy-formsets

This:
https://github.com/nyergler/nested-formset
http://www.yergler.net/blog/2013/09/03/nested-formsets-redux/

'''

ReductionFormSet = inlineformset_factory(BioSANSReduction, BioSANSRegion,
                                         fields = ('empty_beam', 'region', 'comments')) 
class ReductionFormSetHelper(FormHelper):
    def __init__(self, *args, **kwargs):
        super(ReductionFormSetHelper, self).__init__(*args, **kwargs)
        self.form_method = 'post'
        self.form_class = 'form-horizontal'
        self.render_required_fields = True
        self.layout = Layout(Submit('submit', 'Save'),
                             Button('cancel', 'Cancel', css_class='btn-default', onclick="window.history.back()"))

reduction_formset = ReductionFormSet()
reduction_helper = ReductionFormSetHelper()

