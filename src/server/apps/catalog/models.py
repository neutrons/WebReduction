from django.db import models
from django.utils.translation import ugettext_lazy as _


class Facility(models.Model):
    name = models.CharField(
        'facility name',
        help_text='Facility name (e.g. "SNS" or "HFIR")',
        max_length=32,
    )

    description = models.CharField(
        'facility description',
        help_text='Facility description (e.g. "Spallation Neutron Source")',
        max_length=1024,
    )

    active = models.BooleanField(
        'facility is active',
        help_text=(
            'Whether the facility is active and working in the dashboard'
        ),
        default=False,
    )

    class Meta:
        verbose_name_plural = _("Facilities")
        ordering = ('name',)

    def __str__(self):
        return "{}".format(self.name)


class Instrument(models.Model):
    name = models.CharField(
        'instrument name',
        help_text='Instrument name (e.g. "EQSANS" or "BioSANS")',
        max_length=32,
    )

    description = models.CharField(
        'instrument description',
        help_text=(
            'Instrument description (e.g. "Backscattering Spectrometer")'
        ),
        max_length=256,
    )

    beamline = models.CharField(
        'instrument beamline',
        help_text='Beamline that goes into instrument (e.g. "BL-2")',
        max_length=32,
    )

    type = models.CharField(
        'instrument type',
        help_text='Instrument type (e.g. "SANS")',
        max_length=256,
    )

    icat_name = models.CharField(
        'instrument icat name',
        help_text='Name used for querying ICAT server (e.g. "EQSANS")',
        max_length=32,
    )

    ldap_group_name = models.CharField(
        'instrument ldap name',
        help_text='Name used for querying LDAP server',
        max_length=32,
    )

    icat_url = models.CharField(
        'instrument icat url',
        help_text=(
            'Name used for querying ICAT server '
            '(e.g. "https://icat.sns.gov:8081/")'
        ),
        max_length=256,
    )

    drive_path = models.CharField(
        'instrument drive path',
        help_text='Name used for loading files from shared filesystem',
        max_length=256,
    )

    reduction_available = models.BooleanField(
        'instrument can do reductions',
        help_text='Whether the instrument can do reductions',
        default=False,
    )

    active = models.BooleanField(
        'instrument is active',
        help_text=(
            'Whether the instrument is active and working in the dashboard'
        ),
        default=False,
    )

    facility = models.ForeignKey(
        'Facility',
        verbose_name='instrument\'s facility',
        help_text='The facility the instrument is at (e.g. "SNS")',
        on_delete=models.CASCADE,
        related_name='instruments',
    )

    class Meta:
        ordering = ('beamline',)

    def __str__(self):
        return "{} : {}".format(self.facility.name, self.name)
