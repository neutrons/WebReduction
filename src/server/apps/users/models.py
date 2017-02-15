from __future__ import unicode_literals

from django.db import models
from django.conf import settings

from django.utils.translation import ugettext_lazy as _
from django.contrib.auth.models import Group

from django.contrib.auth.models import AbstractBaseUser, UserManager, PermissionsMixin
from server.apps.catalog.models import Facility, Instrument

from smart_selects.db_fields import ChainedForeignKey 


import logging
logger = logging.getLogger('users.models')


class User(AbstractBaseUser, PermissionsMixin):
    '''
    This will overwrite the default user model
    '''
    username = models.CharField(max_length=40, unique=True, db_index=True,)
    email = models.EmailField(max_length=100, unique=False, blank=True)
    fullname = models.CharField(max_length=100, blank=False, verbose_name=_("Full Name"))
    address = models.CharField(max_length=250, blank=False)

    date_joined = models.DateField(auto_now=True)

    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email']

    def get_full_name(self):
        return self.fullname

    def get_short_name(self):
        return self.username

    def __str__(self):
        return self.username


class UserProfile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE,
                                related_name="profile", related_query_name="profile",)

    # Add here as many fields as you want
    home_institution = models.CharField(max_length=200, blank=True)

    facility = models.ForeignKey(Facility, on_delete=models.CASCADE)
    #instrument = models.ForeignKey(Instrument, on_delete=models.CASCADE, null=True)

    instrument = ChainedForeignKey(
        Instrument, 
        chained_field="facility",
        chained_model_field="facility", 
        show_all=False, 
        auto_choose=True,
        # sort=True
        # This will show only instruments with the field: 
        limit_choices_to={'reduction_available': True},
    )
    
    ipts = models.ForeignKey(Group, null=True, blank=True,
        help_text="This IPTS will be used to find your data on ICat.\
         If you leave it empty the ICat lookup will not work!",
         verbose_name = "Integrated Proposal Tracking System (IPTS) number",
    )

    experiment_number =  models.IntegerField(
        default = 0,
        help_text = "HFIR Experiment Number (expXXX)",
    )

    def __str__(self):
        return self.user.username

    # Meta
    class Meta:
        verbose_name = _("Profile")
