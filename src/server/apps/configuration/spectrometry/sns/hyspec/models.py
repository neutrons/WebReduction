from django.db import models

from server.apps.configuration.models import Configuration


class HYSPECConfiguration(Configuration):

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


    @models.permalink
    def get_absolute_url(self):
        return ('configuration:configuration_detail', [self.pk])
