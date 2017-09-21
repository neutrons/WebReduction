from django.db import models
from django.utils.translation import ugettext_lazy as _
from natsort import natsorted

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


class InstrumentManager(models.Manager):
    '''
    Queries go here!!
    '''

    use_for_related_fields = True

    def visible_instruments(self, **kwargs):
        visible_instruments = self.filter(active="True", **kwargs).values()
        natsorted_visible_instruments = natsorted(
            visible_instruments, key=lambda i: i['beamline'])
        return natsorted_visible_instruments


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

    # /HFIR/CG3/
    drive_path = models.CharField(
        'instrument drive path',
        help_text='Name used for loading files from shared filesystem',
        max_length=256,
    )

    # '/HFIR/CG3/IPTS-%(ipts_numbers)s/exp%(experiment_number)s/Datafiles/BioSANS_exp%(experiment_number)s_scan%(scan_number)04d_%(frame_number)04d.xml'
    data_file_path_template = models.CharField(
        help_text='Python template for the full path of the data files',
        max_length=512,
        blank=True,
    )

    # /HFIR/CG3/IPTS-%(ipts_numbers)s/exp%(experiment_number)s/Shared/Reduction
    reduction_path_template = models.CharField(
        help_text='Python template for the full path of the folder where the reduced files go',
        max_length=512,
        blank=True,
    )

    reduction_available = models.BooleanField(
        'instrument can do reductions',
        help_text='Whether the instrument can do reductions',
        default=False,
    )

    active = models.BooleanField(
        'instrument is active (i.e, visble in the catalog)',
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

    # Manager
    objects = InstrumentManager()

    class Meta:
        ordering = ('beamline',)

    def __str__(self):
        #return "{} : {}".format(self.facility.name, self.name)
        return self.name
