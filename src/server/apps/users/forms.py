'''
Created on
@author: rhf
'''

from django import forms

from crispy_forms.helper import FormHelper
from crispy_forms.layout import Submit, Button, Layout, ButtonHolder,HTML
from django.contrib.auth.forms import AuthenticationForm

from .models import UserProfile


class LoginForm(AuthenticationForm):
    '''
    Login form. I'm subclassing AuthenticationForm
    because of the error rendering this class has
    '''
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.layout = Layout(
            'username',
            'password',
            ButtonHolder(
                Submit('login', 'Login', css_class='btn-primary btn-block')
            )
        )


class UserProfileForm(forms.ModelForm):
    '''
    '''

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.helper = FormHelper(self)
        self.helper.form_class = 'form-horizontal'

        # Change fields from text to dropdowns
        # This just changes the appearance
        self.fields['ipts'].widget = forms.Select()
        self.fields['experiment'].widget = forms.Select()

        self.helper.layout.append(Submit('submit', 'Save'))
        self.helper.layout.append(Button('cancel', 'Cancel',
                                         css_class='btn-default',
                                         onclick="window.history.back()"))

    class Meta:
        model = UserProfile
        # exclude = ['user']
        fields = ['facility', 'instrument', 'ipts', 'experiment']



