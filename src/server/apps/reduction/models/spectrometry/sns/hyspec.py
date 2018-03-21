from __future__ import unicode_literals

import logging
from pprint import pformat

from django.db import models

from server.apps.configuration.models import SpectrometrySnsHyspecConfiguration

from server.apps.configuration.models import abstract


logger = logging.getLogger(__name__)  # pylint: disable=C0103


class Reduction(abstract.Reduction):

    field3 = models.CharField(
        "Human description 3",
        max_length=128,
        blank=True,
        help_text="Help for the field."
    )

    configuration = models.ForeignKey(SpectrometrySnsHyspecConfiguration,
                                      on_delete=models.CASCADE,
                                      related_name="regions",
                                      related_query_name="region")

    @models.permalink
    def get_absolute_url(self):
        return ('reduction:reduction_detail', [self.pk])


class Region(abstract.Region):
    '''
    Region can be low, medium or high Q
    This will be a formset from Reduction
    '''

    reduction = models.ForeignKey(Reduction,
                                  on_delete=models.CASCADE,
                                  related_name="regions",
                                  related_query_name="region",)

    comments = models.CharField(
        max_length=256,
        blank=True,
        help_text="Any necessary comments..."
    )

    field1 = models.CharField(
        "Human description 1",
        max_length=128,
        blank=True,
        help_text="Help fr the field."
    )

    field2 = models.CharField(
        "Human description 2",
        max_length=128,
        blank=True,
        help_text="Help fr the field."
    )

    def __str__(self):
        return "Reduction {}".format(self.reduction.title)
