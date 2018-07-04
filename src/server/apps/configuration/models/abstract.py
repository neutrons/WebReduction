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

from server.util.models import ModelMixin


logger = logging.getLogger(__name__)  # pylint: disable=C0103

'''
Abstract models

Configuration - 1 to many - Reductions

'''

class ConfigurationManager(models.Manager):
    '''
    Configuration go here!!
    '''

    use_for_related_fields = True

    def clone(self, pk, title_suffix=" (cloned)"):
        '''
        Clone an object and returns the new object
        '''
        obj = self.get(id=pk)
        users = obj.users.all()

        obj.pk = None  # setting to None, clones the object!
        obj.title += title_suffix
        obj.save()
        obj.users.add(*users) # clone cleans the users fields
        return obj
    
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

    def clone_and_assign_new_uid(self, pk, new_uid):
        '''
        if new_uid is not on the DB, populates it from the ldap
        '''
        user_obj = self._get_user(new_uid)
        logger.debug("User %s is being assigned a new Configuration", user_obj)
        if user_obj is None:
            return None
        else:
            obj = self.clone(pk=pk, title_suffix="")
            obj.users.clear()
            logger.debug("Cloned %s and assigned to user %s.", obj, new_uid)            
            return obj

    def clone_and_assign_new_uids_based_on_ipts(self, pk, ipts):
        '''
        For an IPTS get all user uids from LDAP and clone once the configuration
        All uids will be added to the clone.
        '''
        uids = LdapSns().get_all_uids_for_an_ipts(ipts)
        logger.debug("Users for IPTS %s : %s", ipts, pformat(uids))
        
        obj = self.clone(pk=pk, title_suffix="")
        obj.users.clear()
        obj.save()

        for uid in uids:
            user_obj = self._get_user(uid)
            if user_obj is not None:
                logger.debug("User %s added to Configuration %s.", user_obj, obj)
                obj.users.add(user_obj)
                obj.save()

        return obj

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

    users = models.ManyToManyField(
        settings.AUTH_USER_MODEL,
    )

    # Manager
    objects = ConfigurationManager()

    class Meta:
        abstract = True
        ordering = ["id"]

    def __str__(self):
        return self.title
