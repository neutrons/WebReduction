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

class ConfigurationForm(object):

    def __init__(self, *args, **kwargs):
        super(ConfigurationForm, self).__init__(*args, **kwargs)
        self.helper = FormHelper(self)
        self.helper.form_class = 'form-horizontal'
        self.helper.layout.append(Submit('submit', 'Save'))
        self.helper.layout.append(Button('cancel', 'Cancel', css_class='btn-default',
                                         onclick="window.history.back()"))

    class Meta:
        exclude = ['user', 'instrument']

class ReductionForm(object):
    def __init__(self, *args, **kwargs):
        super(ReductionForm, self).__init__(*args, **kwargs)
        self.helper = FormHelper(self)
        self.helper.form_method = 'post'
        self.helper.form_class = 'form-horizontal'
        self.helper.render_required_fields = True
        self.helper.form_tag = False

    class Meta:
        exclude = ['user', 'instrument', 'script', 'script_interpreter', 'job']
        #widgets = {'script': HiddenInput()}

class ReductionScriptForm(object):
    def __init__(self, *args, **kwargs):
        super(ReductionScriptForm, self).__init__(*args, **kwargs)
        self.helper = FormHelper(self)
        self.helper.form_method = 'post'
        self.helper.form_class = 'form-horizontal'
        self.helper.layout.append(
            # FormActions just groups the buttons
            FormActions(
                # Submit all have type="submit" in the html
                SubmitWithCss(name='save', value='Save & go back', css_class='btn-info'),
                Submit('generate', 'Regenerate the script'),
                SubmitWithCss('submit', 'Save & Submit job', css_class='btn-warning'),
                Button('cancel', 'Cancel', css_class='btn-default',
                       onclick="window.history.back()")))
    class Meta:
        fields = ['script_interpreter', 'script_execution_path', 'script']
        #exclude = ['user', 'instrument']
        
class RegionForm(object):
    def __init__(self, *args, **kwargs):
        super(RegionForm, self).__init__(*args, **kwargs)
        self.helper = FormHelper(self)
        self.helper.form_class = 'form-horizontal'
        self.helper.render_required_fields = True
        self.helper.form_tag = False
        self.helper.render_hidden_fields = True
        self.helper.layout = Layout(
            Fieldset(
                '', # TITLE
                'comments', 'configuration', 'empty_beam_run',  'beam_center_run', 'entries',
            )
        )

    class Meta:
        fields = '__all__'
        widgets = {'entries': HiddenInput()}
