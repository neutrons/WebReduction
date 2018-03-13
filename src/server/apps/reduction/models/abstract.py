from __future__ import unicode_literals

import logging
import os
from pprint import pformat

import ldap
from django.conf import settings
from django.contrib.auth import get_user_model
from django.contrib.contenttypes.fields import GenericRelation
from django.contrib.postgres.fields import JSONField
from django.db import models
from django.forms.models import model_to_dict
from django.utils.translation import ugettext_lazy as _
from django_auth_ldap.backend import LDAPBackend
from django_remote_submission.models import Interpreter, Job

from server.apps.catalog.models import Instrument
from server.apps.users.ldap_util import LdapSns

logger = logging.getLogger(__name__)  # pylint: disable=C0103

'''
Abstract models for SANS

Configuration - 1 to many - Reductions
Reduction - 1 to many - Entries
'''


class ModelMixin(object):
    def get_all_fields(self, fields_to_ignore=('id', 'user')):
        """
        Returns a list of all field names on the instance.
        """
        fields = []
        for f in self._meta.fields:
            fname = f.name
            # resolve picklists/choices, with get_xyz_display() function
            get_choice = 'get_' + fname + '_display'
            if hasattr(self, get_choice):
                value = getattr(self, get_choice)()
            else:
                try:
                    value = getattr(self, fname)
                except AttributeError:
                    value = None
            # only display fields with values and skip some fields entirely
            # if f.editable and value and f.name not in ('id', 'user') : # Hide None
            if f.editable and f.name not in fields_to_ignore:
                fields.append({
                    'label': f.verbose_name,
                    'name': f.name,
                    'value': value,
                    })
        return fields


class ReductionManager(models.Manager):
    '''
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

        obj.pk = None # setting to None, clones the object!
        obj.save()
        #obj.regions = new_regions
        obj.regions.set(new_regions)
        obj.title += " (cloned)"
        obj.save()
        return obj

    def to_json(self, pk):
        '''
        Gets this reduction object in json format
        serializes: reduction and related regions and associated configuration
        '''
        obj = self.select_related().get(pk = pk)
        obj_json = model_to_dict(obj)
        obj_json["user"] = obj.user.username
        obj_json["regions"] = []
        for region in obj.regions.select_related('configuration'):
            d = model_to_dict(region)
            d['configuration'] = model_to_dict(region.configuration)
            obj_json["regions"].append(d)
        return obj_json

        
class Reduction(models.Model, ModelMixin):
    '''
    '''
    title = models.CharField(max_length=256)

    created_date = models.DateTimeField(auto_now_add=True)

    modified_date = models.DateTimeField(auto_now=True)

    script_interpreter = models.ForeignKey(
        Interpreter,
        null=True,
        on_delete=models.CASCADE,
        related_name="%(class)s_interpreters",
        related_query_name="%(class)s_interpreter",
    )

    script_execution_path = models.CharField(max_length=256)

    script = models.TextField(
        blank=True,
        help_text="Python script generated from the reduction entry. \
        If the script was generated already just shows it!"
    )

    instrument = models.ForeignKey(Instrument, on_delete=models.CASCADE,
                                   related_name="%(class)s_instruments",
                                   related_query_name="%(class)s_instrument",)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE,
                             related_name="%(class)s_users",
                             related_query_name="%(class)s_user",)

    job = models.ForeignKey(Job,
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
