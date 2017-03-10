'''
Created on Jan 8, 2016
@author: rhf
'''
from django.forms import ModelForm, inlineformset_factory, HiddenInput

from crispy_forms.layout import Fieldset, HTML

from ..forms import ConfigurationForm, ReductionForm, RegionForm, ReductionScriptForm
from .models import GPSANSConfiguration, GPSANSReduction, GPSANSRegion

class GPSANSConfigurationForm(ConfigurationForm, ModelForm):        
    class Meta(ConfigurationForm.Meta):
        model = GPSANSConfiguration

class GPSANSReductionForm(ReductionForm, ModelForm):
    class Meta(ReductionForm.Meta):
        model = GPSANSReduction

class GPSANSReductionScriptForm(ReductionScriptForm, ModelForm):
    class Meta(ReductionScriptForm.Meta):
        model = GPSANSReduction

class GPSANSRegionForm(RegionForm, ModelForm):
    class Meta(RegionForm.Meta):
        model = GPSANSRegion

 # New
GPSANSRegionInlineFormSetCreate = inlineformset_factory(GPSANSReduction, GPSANSRegion, form=GPSANSRegionForm, extra=3, can_delete=False)
# Edit
GPSANSRegionInlineFormSetUpdate = inlineformset_factory(GPSANSReduction, GPSANSRegion, form=GPSANSRegionForm, extra=0, can_delete=False)