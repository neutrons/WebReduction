from __future__ import unicode_literals

import logging

from django.contrib.postgres.fields import JSONField
from django.db import models
from django.forms.models import model_to_dict

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


class ReductionManager(abstract.ReductionManager):
    '''
    '''

    def to_json(self, pk):
        '''
        Gets this reduction object in json format
        serializes: reduction and related regions and associated configuration
        '''
        obj = self.select_related().get(pk=pk)
        obj_json = model_to_dict(obj)
        obj_json["user"] = obj.user.username
        obj_json["regions"] = []
        for region in obj.regions.select_related('configuration'):
            d = model_to_dict(region)
            d['configuration'] = model_to_dict(region.configuration)
            obj_json["regions"].append(d)
        return obj_json
