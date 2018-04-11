##########################################################################
# BIOSANS
##########################################################################

from django.db import models

from server.apps.configuration.models.sans.hfir.biosans import Configuration

from server.apps.reduction.models import abstract
from server.apps.reduction.models.sans import abstract as sans_abstract
##########################################################################
# BIOSANS
##########################################################################

from django.db import models

from server.apps.configuration.models.sans.hfir.biosans import Configuration

from server.apps.reduction.models import abstract
from server.apps.reduction.models.sans import abstract as sans_abstract


class ReductionBioSANS(abstract.Reduction):

    @models.permalink
    def get_absolute_url(self):
        return ('reduction:reduction_detail', [self.pk])


class RegionBioSANS(sans_abstract.Region):

    reduction = models.ForeignKey(
        ReductionBioSANS,
        on_delete=models.CASCADE,
        related_name="regions",
        related_query_name="region",)

    configuration = models.ForeignKey(
        Configuration,
        on_delete=models.CASCADE,
        related_name="regions",
        related_query_name="region")

    def __str__(self):
        return "Reduction {}".format(self.reduction.title)
