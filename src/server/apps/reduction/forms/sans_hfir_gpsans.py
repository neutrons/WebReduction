'''
Created on Jan 8, 2016
@author: rhf
'''
from crispy_forms.layout import HTML, Fieldset
from django.forms import HiddenInput, ModelForm, inlineformset_factory

from .abstract import (ConfigurationForm, ReductionForm, ReductionScriptForm,
                       RegionForm)
from server.apps.configuration.models import SansHfirGpsansConfiguration, SansHfirGpsansReduction, SansHfirGpsansRegion


class SansHfirGpsansReductionForm(ReductionForm, ModelForm):
    class Meta(ReductionForm.Meta):
        model = SansHfirGpsansReduction


class SansHfirGpsansReductionScriptForm(ReductionScriptForm, ModelForm):
    class Meta(ReductionScriptForm.Meta):
        model = SansHfirGpsansReduction


class SansHfirGpsansRegionForm(RegionForm, ModelForm):
    class Meta(RegionForm.Meta):
        model = SansHfirGpsansRegion


# New
SansHfirGpsansRegionInlineFormSetCreate = inlineformset_factory(
    SansHfirGpsansReduction, SansHfirGpsansRegion, form=SansHfirGpsansRegionForm, extra=3, can_delete=False)
# Edit
SansHfirGpsansRegionInlineFormSetUpdate = inlineformset_factory(
    SansHfirGpsansReduction, SansHfirGpsansRegion, form=SansHfirGpsansRegionForm, extra=0, can_delete=False)
