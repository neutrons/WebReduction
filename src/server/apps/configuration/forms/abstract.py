'''
Created on Jan 8, 2016
@author: rhf
'''
from crispy_forms.bootstrap  import FormActions
from crispy_forms.helper import FormHelper
from crispy_forms.layout import Submit, Button, Layout, Fieldset, HTML, Field

from django.forms import HiddenInput


class SubmitWithCss(Submit):
    '''
    Overries the Submit button to remove the default css:
    btn btn-primary
    '''
    def __init__(self, *args, **kwargs):
        self.field_classes = 'btn'
        super(Submit, self).__init__(*args, **kwargs)


class Configuration(object):
    '''
    This is an abstract form configuration
    Note that the `model` is missing thus this cannot be used
    '''

    def __init__(self, *args, **kwargs):
        super(Configuration, self).__init__(*args, **kwargs)
        self.helper = FormHelper(self)
        # self.helper.form_class = 'form-inline'
        self.helper.form_class = 'form-horizontal'
        self.helper.layout.append(Submit('submit', 'Save'))
        self.helper.layout.append(Button('cancel', 'Cancel', css_class='btn-default',
                                         onclick="window.history.back()"))

    class Meta:
        exclude = ['user', 'instrument']

