'''
Created on Jan 8, 2016
@author: rhf
'''
from django.forms import ModelForm, inlineformset_factory, HiddenInput

from crispy_forms.layout import Fieldset, HTML, Div

from ..forms import ConfigurationForm, ReductionForm, RegionForm, ReductionScriptForm
from .models import BioSANSConfiguration, BioSANSReduction, BioSANSRegion

class BioSANSConfigurationForm(ConfigurationForm, ModelForm):
    def __init__(self, *args, **kwargs):
        super(BioSANSConfigurationForm, self).__init__(*args, **kwargs)
        self.helper.layout.insert(0, HTML("""<div class="alert alert-warning">
                    <strong>Note: </strong> Two separate configurations have to be created for Main and Wing detector!.
                </div>"""))
    class Meta(ConfigurationForm.Meta):
        model = BioSANSConfiguration

class BioSANSReductionForm(ReductionForm, ModelForm):
    class Meta(ReductionForm.Meta):
        model = BioSANSReduction

class BioSANSReductionScriptForm(ReductionScriptForm, ModelForm):
    class Meta(ReductionScriptForm.Meta):
        model = BioSANSReduction

class BioSANSRegionForm(RegionForm, ModelForm):
    class Meta(RegionForm.Meta):
        model = BioSANSRegion

 # New
BioSANSRegionInlineFormSetCreate = inlineformset_factory(BioSANSReduction, BioSANSRegion, form=BioSANSRegionForm, extra=2, can_delete=False)
# Edit
BioSANSRegionInlineFormSetUpdate = inlineformset_factory(BioSANSReduction, BioSANSRegion, form=BioSANSRegionForm, extra=0, can_delete=False)