from django.db import models

from server.apps.configuration.models import abstract
from server.apps.configuration.models.spectrometry.abstract import Mask


class ConfigurationHYSPEC(abstract.Configuration):

    '''
    norm_file = '/SNS/HYS/shared/autoreduce/V_3p8meV_Aug31_2017.nxs'
    correct_transmission=False
    Emin_fraction=""
    Emax_fraction=""
    Estep_meV=""

    MaskBTPParameters=[]
    MaskBTPParameters.append({'Pixel': '1-8,121-128'})

    SaveMDEvents=True
    '''

    normalization_file = models.CharField(
        "normalization file",
        max_length=256,
        blank=True,
        help_text="Server side file path for the Vanadium file"
    )

    correct_transmission = models.BooleanField(
        'correct for transmission',
        default=False,
        help_text='Whether to correct for transmission',
    )

    e_min_fraction = models.DecimalField(
        u'E\u2098\u1d62\u2099 fraction',
        max_digits=4,
        decimal_places=2,
        blank=False,
        help_text="Minimum energy fraction."
    )

    e_max_fraction = models.DecimalField(
        u'E\u2098\u2090\u2093 fraction',
        max_digits=4,
        decimal_places=2,
        blank=False,
        help_text="Maximum of energy fraction."
    )

    e_step = models.DecimalField(
        u'E step (meV)',
        max_digits=4,
        decimal_places=2,
        blank=False,
        help_text="Energy step in meV."
    )

    Save_md_events = models.BooleanField(
        'Save MD Events',
        default=True,
        help_text='Whether to save data as Mantid multi dimensional events.',
    )



    @models.permalink
    def get_absolute_url(self):
        return ('configuration:detail', [self.pk])


class MaskHYSPEC(Mask):
    '''
    Region can be low, medium or high Q
    This will be a formset from Reduction
    '''

    configuration = models.ForeignKey(
        ConfigurationHYSPEC,
        on_delete=models.CASCADE,
        related_name="configurations",
        related_query_name="configuration",
    )

    def __str__(self):
        return "Reduction {}".format(self.reduction.title)