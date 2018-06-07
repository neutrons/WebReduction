from __future__ import unicode_literals

import logging
from pprint import pformat

from django.conf import settings
from django.contrib.auth import get_user_model
from django.db import models
from django.forms.models import model_to_dict
from django_remote_submission.models import Interpreter, Job
from django_auth_ldap.backend import LDAPBackend

from server.apps.catalog.models import Instrument
from server.util.models import ModelMixin


logger = logging.getLogger(__name__)  # pylint: disable=C0103

'''
Abstract models for SANS

Configuration - 1 to many - Reductions
Reduction - 1 to many - Entries
'''

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
        obj_json["user"] = obj.user.username
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


class Reduction(models.Model, ModelMixin):
    '''
    '''
    title = models.CharField(max_length=256)

    created_date = models.DateTimeField(auto_now_add=True)

    modified_date = models.DateTimeField(auto_now=True)

    share_with_ipts = models.BooleanField(
        'Share this reduction with other members of this IPTS.',
        help_text=(
            'If checked, anyone belonging to this IPTS can see and change this Redution.'
        ),
        default=True,
    )


    script_interpreter = models.ForeignKey(
        Interpreter,
        null=True,
        on_delete=models.CASCADE,
        related_name="%(class)s_interpreters",
        related_query_name="%(class)s_interpreter",
        default=1,
    )
    
    script_execution_path = models.CharField(max_length=256)

    script = models.TextField(
        blank=True,
        help_text="Python script generated from the reduction entry. \
        If the script was generated already just shows it!"
    )

    RUN_CHOICES = (
        (1, 'Copy and Execute the script'),
        (2, 'Copy the script'),
    )
    run_type = models.IntegerField(
        choices=RUN_CHOICES,
        default=1,
        help_text="For auto reduction copy only the script. If you have "
            "previledges you can copy the script to the instrument "
            "autoreduction directory."
    )

    instrument = models.ForeignKey(
        Instrument, on_delete=models.CASCADE,
        related_name="%(class)s_instruments",
        related_query_name="%(class)s_instrument",)

    # user = models.ForeignKey(
    #     settings.AUTH_USER_MODEL, on_delete=models.CASCADE,
    #     related_name="%(class)s_users",
    #     related_query_name="%(class)s_user",)
    
    users = models.ManyToManyField(
        settings.AUTH_USER_MODEL,
        #related_name="%(class)s_users",
        #related_query_name="%(class)s_user",
    )


    job = models.ForeignKey(
        Job,
        null=True,
        on_delete=models.CASCADE,
        related_name="%(class)s_job",
        related_query_name="%(class)s_job",)

    # Manager
    objects = ReductionManager()

    class Meta:
        ordering = ["id"]
        abstract = True

    def __str__(self):
        return self.title


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
