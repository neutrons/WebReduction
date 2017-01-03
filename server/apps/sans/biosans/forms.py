'''
Created on Jan 8, 2016
@author: rhf
'''
from django.forms import ModelForm
from django.forms import inlineformset_factory, HiddenInput

from crispy_forms.helper import FormHelper
from crispy_forms.layout import Submit, Button, HTML, Div, Layout, Fieldset

from .models import BioSANSConfiguration, BioSANSReduction, BioSANSRegion

from dal import autocomplete

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
        self.helper = FormHelper()
        self.helper.form_method = 'post'
        self.helper.form_class = 'form-horizontal'
        self.helper.render_required_fields = True
        # self.helper.layout = Layout(Submit('submit', 'Save'),
        #                      Button('cancel', 'Cancel', css_class='btn-default', onclick="window.history.back()"))
        self.helper.form_tag = False

    class Meta:
        model = BioSANSReduction
        exclude = ['user','instrument']


class RegionForm(ModelForm):
    def __init__(self, *args, **kwargs):
        super(RegionForm, self).__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.form_class = 'form-horizontal'
        self.helper.render_required_fields = True
        self.helper.form_tag = False
        self.helper.render_hidden_fields = True
        self.helper.layout = Layout(
            Fieldset(
                '', # TITLE
                'region', 'comments','configuration','empty_beam','entries',
                #HTML('<hr/><div id="entries"></div>'),
            )
        )

    class Meta:
        model = BioSANSRegion
        widgets = {'entries': HiddenInput()}
        fields = '__all__'
        #fields = ['region', 'comments','configuration','empty_beam','entries']

 # New
RegionInlineFormSetCreate = inlineformset_factory(BioSANSReduction, BioSANSRegion, form=RegionForm, extra=3, can_delete=False)
# Edit
RegionInlineFormSetUpdate = inlineformset_factory(BioSANSReduction, BioSANSRegion, form=RegionForm, extra=0, can_delete=True)