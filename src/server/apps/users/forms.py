'''
Created on 
@author: rhf
'''

from django.forms import ModelForm

from crispy_forms.helper import FormHelper
from crispy_forms.layout import Submit, Button

from .models import UserProfile

class UserProfileForm(ModelForm):
    '''
    '''
    def __init__(self, *args, **kwargs):
        super(UserProfileForm, self).__init__(*args, **kwargs)
        self.helper = FormHelper(self)
        self.helper.form_class = 'form-horizontal'
        self.helper.layout.append(Submit('submit', 'Submit'))
        self.helper.layout.append(Button('cancel', 'Cancel', css_class='btn-default', onclick="window.history.back()"))

    class Meta:
        model = UserProfile
        exclude = ['user']
