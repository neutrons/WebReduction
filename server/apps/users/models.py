from __future__ import unicode_literals

from django.db import models
from django.conf import settings

from django.utils.translation import ugettext_lazy as _

from django.contrib.auth.models import AbstractBaseUser, UserManager, PermissionsMixin
from server.apps.catalog.models import Facility, Instrument

from smart_selects.db_fields import ChainedForeignKey 

class User(AbstractBaseUser, PermissionsMixin):
    '''
    This will overwrite the default user model
    '''
    username = models.CharField(max_length=40, unique=True, db_index=True,)
    email = models.EmailField(max_length=100, unique=True, blank=True)
    fullname = models.CharField(max_length=100, blank=True, verbose_name=_("Full Name"))
    address = models.CharField(max_length=250, blank=True)

    date_joined = models.DateField(auto_now=True)

    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)

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
    email_address = models.EmailField()

    facility = models.ForeignKey(Facility, on_delete=models.CASCADE, null=True)
    #instrument = models.ForeignKey(Instrument, on_delete=models.CASCADE, null=True)

    instrument = ChainedForeignKey(
        Instrument, 
        chained_field="facility",
        chained_model_field="facility", 
        # show_all=False, 
        # auto_choose=True,
        # sort=True
    )
    
    def __str__(self):
        return self.user.username

    # Meta
    class Meta:
        verbose_name = _("User Profile")
