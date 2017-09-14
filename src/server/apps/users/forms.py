'''
Created on 
@author: rhf
'''

from django.forms import ModelForm, Select

from crispy_forms.helper import FormHelper
from crispy_forms.layout import Submit, Button, Layout, ButtonHolder
from django.contrib.auth.forms import AuthenticationForm

from .models import UserProfile


class LoginForm(AuthenticationForm):
    '''
    Login form. I'm subclassing AuthenticationForm
    because of the error rendering this class has
    '''
    def __init__(self, *args, **kwargs):
        super(LoginForm, self).__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.layout = Layout(
            'username',
            'password',
            ButtonHolder(
                Submit('login', 'Login', css_class='btn-primary btn-block')
            )
        )

class UserProfileForm(ModelForm):
    '''
    '''
    def __init__(self, *args, **kwargs):
        super(UserProfileForm, self).__init__(*args, **kwargs)
        self.helper = FormHelper(self)
        self.helper.form_class = 'form-horizontal'

        self.fields['ipts'].widget = Select()

        self.helper.layout.append(Submit('submit', 'Submit'))
        self.helper.layout.append(Button('cancel', 'Cancel',
                                         css_class='btn-default',
                                         onclick="window.history.back()"))

    class Meta:
        model = UserProfile
        exclude = ['user']
