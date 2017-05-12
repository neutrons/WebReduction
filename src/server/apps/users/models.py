from __future__ import unicode_literals

import logging
import re

from django.conf import settings
from django.contrib.auth.models import (AbstractBaseUser, Group,
                                        PermissionsMixin, UserManager)
from django.db import models
from django.utils.translation import ugettext_lazy as _
from django.db import IntegrityError
from smart_selects.db_fields import ChainedForeignKey

from server.apps.catalog.icat.facade import get_expriments
from server.apps.catalog.models import Facility, Instrument

logger = logging.getLogger(__name__)  # pylint: disable=C0103


class User(AbstractBaseUser, PermissionsMixin):
    '''
    This will overwrite the default user model
    '''
    username = models.CharField(max_length=40, unique=True, db_index=True,)
    email = models.EmailField(max_length=100, unique=False, blank=True)
    fullname = models.CharField(max_length=100, blank=False,
                                verbose_name=_("Full Name"))
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


class IptsManager(models.Manager):
    """
    Lets us do querysets limited to families that have 
    currently enrolled students, e.g.:
        Family.has_students.all() 
    """
    use_for_related_fields = True


class Ipts(Group):
    '''
    Inherits name from the Group
    '''

    instrument = models.ForeignKey(
        Instrument,
        null=True,
        blank=True,
        on_delete=models.CASCADE,
        related_name="%(class)s_instruments",
        related_query_name="%(class)s_instrument",
    )

    # Manager
    objects = IptsManager()

    class Meta:
        verbose_name = "Integrated Proposal Tracking System (IPTS) number"
        verbose_name_plural = "IPTSs"

    def __str__(self):
        return u'%s' % (self.name)


class ExperimentManager(models.Manager):
    '''
    Queries go here!!
    '''
    use_for_related_fields = True

    def populate_experiments(self):
        '''
        Used after each login. Populates experiment table with
        ICat information (IPTS + exp - for hfir)

        ipts_exp_json is of the form
        [ {'exp': ['exp307', 'exp314', 'exp360'], 'ipts': 'IPTS-11518'},
          {'exp': ['exp316'], 'ipts': 'IPTS-14466'}, ... ]
        '''

        logger.debug("Populate_experiments: IPTSs + Exps")

        instruments = Instrument.objects.filter(reduction_available=True)
        for instrument in instruments:
            logger.debug("Populating IPTS and Experiments for %s.", instrument)
            iptss_json = get_expriments(
                instrument.facility.name,
                instrument.icat_name
            )
            for entry in iptss_json:
                try:
                    # SNS
                    this_ipts = entry["id"]
                except KeyError:
                    # HFIR
                    this_ipts = entry["ipts"]
                try:
                    ipts_obj, _ = Ipts.objects.get_or_create(
                        name=this_ipts,
                        instrument=instrument
                    )
                except IntegrityError as e:
                    logger.error("Ignoring Duplicated IPTS: %s.", e)
                    continue
                # If it's SNS entry.get("exp" is None!
                for this_exp in entry.get("exp", []):
                    r = re.search(r"exp(\d+)", this_exp)
                    exp_number = int(r.group(1))
                    self.update_or_create(
                        experiment_number=exp_number,
                        ipts=ipts_obj
                    )


class Experiment(models.Model):
    '''
    Experiment number. Only used for HFIR.
    '''
    experiment_number = models.IntegerField(
        null=True,
        blank=True,
        help_text="HFIR Experiment Number (expXXX)",
    )

    ipts = models.ForeignKey(
        Ipts,
        null=True,
        blank=True,
        on_delete=models.CASCADE,
        related_name="%(class)s_iptss",
        related_query_name="%(class)s_ipts",
        help_text="This IPTS will be used to find your data on ICat."
                  " If you leave it empty the ICat lookup will not work!",
        verbose_name="Integrated Proposal Tracking System (IPTS) number",
    )

    # Manager
    objects = ExperimentManager()

    def __str__(self):
        return "exp{}".format(self.experiment_number)


class UserProfileManager(models.Manager):
    '''
    Queries go here!!
    '''
    use_for_related_fields = True

    def get_iptss_for_this_user(self, user):
        return Ipts.objects.filter(
            name__istartswith="IPTS").filter(user=user)


class UserProfile(models.Model):
    '''
    Adds some extra info the User class
    One to One relation
    '''

    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="profile",
        related_query_name="profile",
    )

    home_institution = models.CharField(max_length=200, blank=True)

    facility = models.ForeignKey(Facility, on_delete=models.CASCADE)

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

    ipts = ChainedForeignKey(
        Ipts,
        null=True,
        blank=True,
        chained_field="instrument",
        chained_model_field="instrument",
        show_all=False,
        auto_choose=True,
        sort=True
    )

    experiment = ChainedForeignKey(
        Experiment,
        null=True,
        blank=True,
        chained_field="ipts",
        chained_model_field="ipts",
        show_all=False,
        auto_choose=True,
        sort=True
        # This will show only instruments with the field:
        # limit_choices_to={'reduction_available': True},
    )

    def __str__(self):
        return self.user.username

    # Manager
    objects = UserProfileManager()

    # Meta
    class Meta:
        verbose_name = _("Profile")
