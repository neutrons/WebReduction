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

from .abstract import Region


class SansRegion(Region):
    '''
    Region can be low, medium or high Q
    This will be a formset from Reduction
    '''

    empty_beam_run = models.CharField(
        "Empty Beam Transmission",
        max_length=128,
        blank=True,
        help_text="Use run number or file path. If empty, uses that of the Configuration."
    )

    beam_center_run = models.CharField(
        "Beam Center",
        max_length=128,
        blank=True,
        help_text="Use run number or file path. If empty, uses that of the Configuration."
    )

    comments = models.CharField(
        max_length=256,
        blank=True,
        help_text="Any necessary comments..."
    )

    # This will be the json for sample / backgroun sample/transmission
    entries = JSONField()

    class Meta:
        abstract = True
