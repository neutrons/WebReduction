from django.db import models

from .abstract import Configuration


class SpectrometrySnsHyspecConfiguration(Configuration):

    wavelength = models.DecimalField(
        u'Wavelength (\u212B)',
        max_digits=4,
        decimal_places=2,
        blank=True,
        null=True,
        help_text="If empty uses the value set in the data file."
    )

    wavelength_spread = models.DecimalField(
        'Wavelength Spread (%)',
        max_digits=3,
        decimal_places=2,
        blank=True,
        null=True,
        help_text="If empty uses the value set in the data file."
    )

    configuration_file = models.CharField(
        max_length=256,
        blank=True,
        help_text="Server side file path"
    )

    @models.permalink
    def get_absolute_url(self):
        return ('configuration:configuration_detail', [self.pk])
