from __future__ import unicode_literals

import logging
from pprint import pformat

from django.conf import settings
from django.contrib.auth import get_user_model
from django.db import models
from django.forms.models import model_to_dict
from django_remote_submission.models import Interpreter, Job
from django_auth_ldap.backend import LDAPBackend
from django.contrib.postgres.fields import JSONField

from server.apps.catalog.models import Instrument
from server.util.models import ModelMixin
from server.apps.users.ldap_util import LdapSns

logger = logging.getLogger(__name__)  # pylint: disable=C0103

'''
Abstract models for SANS

Configuration - 1 to many - Reductions
Reduction - 1 to many - Entries
'''

################################################################################
# Actions
################################################################################

class Actions(models.Model, ModelMixin):
    '''
    '''
    
    created_date = models.DateTimeField(auto_now_add=True)

    modified_date = models.DateTimeField(auto_now=True)

    description = models.CharField(max_length=256)

    instrument = models.ForeignKey(
        Instrument, on_delete=models.CASCADE,
        related_name="%(class)s_instruments",
        related_query_name="%(class)s_instrument",
    )

    script_interpreter = models.ForeignKey(
        Interpreter,
        null=True,
        on_delete=models.CASCADE,
        related_name="%(class)s_interpreters",
        related_query_name="%(class)s_interpreter",
    )

    script_template_path  = models.CharField(
        max_length=256,
        help_text="Where the script template is. E.g. /SNS/HYS/shared/templates/reduce.tpl"
    )

    destination_directory_path_template  = models.CharField(
        max_length=256,
        help_text="Where the script is going to be copied and may be executed."
            r" E.g. /SNS/HYS/%(ipts_number)s/shared/reduce/%(hash)s"
    )

    django_remote_submission_tasks = models.CharField(
        max_length=32,
        help_text="Tasks in Django Remote Submission: copy_job_to_server, submit_job_to_server",
    )

    def __str__(self):
        return "{}".format(self.description)


################################################################################
# Reduction
################################################################################

class ReductionManager(models.Manager):
    '''
    This is a general reduction manager.
    '''

    use_for_related_fields = True

    def clone(self, pk):
        '''
        Clones the Reduction object and related regions
        '''

        obj = self.get(id=pk)
        # Let's clone the related entries
        new_regions = []
        for region in obj.regions.all():
            region.pk = None
            region.save()
            new_regions.append(region)
        users = obj.users.all()

        obj.pk = None  # setting to None, clones the object!
        obj.save()
        #obj.regions = new_regions
        obj.regions.set(new_regions)
        obj.title += " (cloned)"
        obj.save()
        obj.users.add(*users)
        return obj

    def to_json(self, pk):
        '''
        Gets this reduction object in json format
        serializes: reduction and related regions and associated configuration
        Not for use in SANS:
        1 Reduction has 1 Configuration
        1 Reduction has multiple Regions
        '''
        obj = self.select_related().get(pk=pk)
        obj_json = model_to_dict(obj)
        obj_json["users"] = ", ".join(user.username for user in obj.users.all())
        obj_json["regions"] = []
        for region in obj.regions.select_related():
            d = model_to_dict(region)
            obj_json["regions"].append(d)
        obj_json['configuration'] = model_to_dict(obj.configuration)

        if hasattr(obj.configuration, 'masks') and  obj.configuration.masks is not None:
            obj_json['configuration']['masks']=[]
            for mask in obj.configuration.masks.select_related():
                d = model_to_dict(mask)
                obj_json['configuration']['masks'].append(d)
            
        # logger.debug(pformat(obj_json))
        return obj_json

    def _get_user(self, uid):
        '''
        If the user is not in the DB already
        gets it from LDAP and populate the DB with it
        returns the User object or None if it doesn't exist
        '''
        if not get_user_model().objects.filter(username=uid).exists():
            # this new_uid is not on the database
            logger.debug("UID %s does not exist in the DB. "
                "Getting it from LDAP.", uid)
            user = LDAPBackend().populate_user(uid)
            if not user:
                logger.warning("UID %s is known to belong to this IPTS but does"
                    " not exist in LDAP... Skipping it.", uid)
                return None
        return get_user_model().objects.get(username=uid)

    def share(self, pk, ipts):
        '''
        For an IPTS get all user uids from LDAP and assign them to the obj.
        '''
        uids = LdapSns().get_all_uids_for_an_ipts(ipts)
        logger.debug("Share: Users for IPTS %s : %s", ipts, pformat(uids))
        
        obj = self.get(id=pk)
        # obj.users.clear()
        for uid in uids:
            user_obj = self._get_user(uid)
            if user_obj is not None:
                obj.users.add(user_obj)
                obj.configuration.users.add(user_obj)
                obj.save()
                logger.debug("Share: User {} added to Reduction '{}' and Configuration '{}'".format(
                    user_obj, obj, obj.configuration))
        return obj
     

class Reduction(models.Model, ModelMixin):
    '''
    '''
    title = models.CharField(max_length=256)

    created_date = models.DateTimeField(auto_now_add=True)

    modified_date = models.DateTimeField(auto_now=True)

    # Additional parameters: e.g. Runs for executing the algorithm
    parameters = JSONField(null=True, default=[], blank=True,)

    script = models.TextField(
        blank=True,
        help_text="Python script generated from the reduction entry. \
        If the script was generated already just shows it!"
    )

    instrument = models.ForeignKey(
        Instrument, on_delete=models.CASCADE,
        related_name="%(class)s_instruments",
        related_query_name="%(class)s_instrument",
    )
    
    users = models.ManyToManyField(
        settings.AUTH_USER_MODEL,
        #related_name="%(class)s_users",
        #related_query_name="%(class)s_user",
    )

    action = models.ForeignKey(
        Actions,
        verbose_name="Action to take for the reduction",
        null=True,
        on_delete=models.CASCADE,
        related_name="%(class)s_action",
        related_query_name="%(class)s_action",
        help_text="Pick an action for your reduction",
    )

    job = models.ForeignKey(
        Job,
        null=True,
        on_delete=models.CASCADE,
        related_name="%(class)s_job",
        related_query_name="%(class)s_job",
    )

    # Manager
    objects = ReductionManager()

    class Meta:
        ordering = ["id"]
        abstract = True

    def __str__(self):
        return self.title

################################################################################
# Region
################################################################################

class RegionManager(models.Manager):
    '''
    Queries go here!!
    '''
    use_for_related_fields = True


class Region(models.Model, ModelMixin):
    '''
    Region can be low, medium or high Q
    This will be a formset from Reduction
    '''

    created_date = models.DateTimeField(auto_now_add=True)

    modified_date = models.DateTimeField(auto_now=True)

    # Manager
    objects = RegionManager()

    class Meta:
        abstract = True
        ordering = ["id"]

