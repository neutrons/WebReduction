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
        super(LoginForm, self).__init__(*args, **kwargs)
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
        super(UserProfileForm, self).__init__(*args, **kwargs)
        self.helper = FormHelper(self)
        self.helper.form_class = 'form-horizontal'

        #self.fields['ipts'] = forms.CharField(widget=forms.Select(attrs={'class':'regDropDown'}))
        #self.fields['ipts'] = forms.ChoiceField(widget=forms.Select(attrs={'class':'form-control'}),)
        # self.fields['ipts'].widget = forms.Select()
        # self.fields['ipts'].widget.choices = [('bf','bof')]
        # self.fields['experiment'].widget = forms.Select()

        self.helper.layout.insert(2, HTML('''
        <h1><span class="label label-warning"><span class="glyphicon glyphicon-warning-sign"> This is not working yet!</span></h1>
        <H3>Reduction Parameters</H3>
        '''))
        # <span class="glyphicon glyphicon-search"></span>
        self.helper.layout.insert(3, Button('fecth_oncat',  'Get IPTS info',
                                         css_class='btn-info',
                                         onclick="fetchIptsInfo()",
                                         data_loading_text="Getting IPTS info..."))
        
        self.helper.layout.append(Submit('submit', 'Save'))
        self.helper.layout.append(Button('cancel', 'Cancel',
                                         css_class='btn-default',
                                         onclick="window.history.back()"))

    class Meta:
        model = UserProfile
        exclude = ['user']
