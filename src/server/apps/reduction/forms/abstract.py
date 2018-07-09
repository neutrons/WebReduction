'''
Created on Jan 8, 2016
@author: rhf
'''
from crispy_forms.bootstrap  import FormActions
from crispy_forms.helper import FormHelper
from crispy_forms.layout import (
    Submit, Button, Layout, Fieldset, HTML,
)
from crispy_forms.bootstrap import Field, InlineCheckboxes

from django.forms import HiddenInput, BooleanField


# class SubmitWithCss(Submit):
#     '''
#     Overries the Submit button to remove the default css:
#     btn btn-primary
#     '''
#     def __init__(self, *args, **kwargs):
#         self.field_classes = 'btn'
#         super(SubmitWithCss, self).__init__(*args, **kwargs)

class ReductionForm(object):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.helper = FormHelper(self)
        self.helper.form_method = 'post'
        self.helper.form_class = 'form-horizontal'
        self.helper.render_required_fields = True
        self.helper.form_tag = False # To NOT render the form csrf fields etc..

    class Meta:
        exclude = [
            'users', 'instrument', 'parameters', 'script', 'job', 'action', 
        ]
        #widgets = {'script': HiddenInput()}

class ReductionScriptForm(object):
    def __init__(self, *args, **kwargs):
        super(ReductionScriptForm, self).__init__(*args, **kwargs)
        self.helper = FormHelper(self)
        self.helper.form_method = 'post'
        self.helper.form_class = 'form-horizontal'
    class Meta:
        fields = [ 'action', 'parameters', 'script',]
        #exclude = ['user', 'instrument']
        #widgets = {'parameters': HiddenInput()}


class RegionForm(object):
    def __init__(self, *args, **kwargs):
        super(RegionForm, self).__init__(*args, **kwargs)
        self.helper = FormHelper(self)
        self.helper.form_class = 'form-horizontal'
        self.helper.render_required_fields = True
        self.helper.form_tag = False
        self.helper.render_hidden_fields = True

    class Meta:
        fields = '__all__'
        #widgets = {'entries': HiddenInput()}
