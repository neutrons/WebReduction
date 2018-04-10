from __future__ import unicode_literals

import logging

from django.contrib.postgres.fields import JSONField
from django.db import models

from .. import abstract

logger = logging.getLogger(__name__)  # pylint: disable=C0103


class Region(abstract.Region):
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
