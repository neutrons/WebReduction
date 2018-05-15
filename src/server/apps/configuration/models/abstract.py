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
Abstract models

Configuration - 1 to many - Reductions

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


class ConfigurationManager(models.Manager):
    '''
    Configuration go here!!
    '''

    use_for_related_fields = True

    def clone(self, pk):
        '''
        Clone an object and returns
        '''
        obj = self.get(id=pk)
        obj.pk = None  # setting to None, clones the object!
        obj.title += " (cloned)"
        obj.save()
        return obj

    def clone_and_assign_new_uid(self, pk, new_uid):
        '''
        if new_uid is not on the DB, populates it from the ldap
        '''
        if not get_user_model().objects.filter(username=new_uid).exists():
            # this new_uid is not on the database
            logger.debug("UID %s does not exist. Getting it from LDAP." % (new_uid))
            ldapobj = LDAPBackend()
            user = ldapobj.populate_user(new_uid)
            if not user:
                logger.warning("UID %s does not exist in LDAP... Skipping it." % new_uid)
                return None
        obj = self.get(id=pk)
        logger.debug("Cloning %s and assigning to user %s.", obj, new_uid)
        obj.pk = None  # setting to None, clones the object!
        obj.user = get_user_model().objects.get(username=new_uid)
        obj.save()
        return obj

    def clone_and_assign_new_uids_based_on_ipts(self, pk, ipts):
        '''
        For an IPTS get all user uids from LDAP and clones
        the configuration as above
        '''
        ldap_server = LdapSns()
        uids = ldap_server.get_all_uids_for_an_ipts(ipts)
        logger.debug("Users for IPTS %s : %s", ipts, pformat(uids))
        cloned_objs = []
        for uid in uids:
            obj = self.clone_and_assign_new_uid(pk, uid)
            if obj:
                cloned_objs.append(obj)
        return cloned_objs

class Configuration(models.Model, ModelMixin):
    '''

    '''
    title = models.CharField(max_length=256)

    created_date = models.DateTimeField(auto_now_add=True)

    modified_date = models.DateTimeField(auto_now=True)

    instrument = models.ForeignKey(
        Instrument,
        on_delete=models.CASCADE,
        related_name="%(class)s_instruments",
        related_query_name="%(class)s_instrument",
        # blank=True,
        # null=True,
    )

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="%(class)s_users",
        related_query_name="%(class)s_user",
        # blank=True,
        # null=True,
    )

    # Manager
    objects = ConfigurationManager()

    class Meta:
        abstract = True
        ordering = ["id"]

    def __str__(self):
        return self.title
