##########################################################################
# BIOSANS
##########################################################################

import re

from django.core.exceptions import ValidationError
from django.db import models

from ..models import Configuration, Reduction, Region


def validate_q_range(value):
    try:
        l = [float(i) for i in re.split(';|,', value)]
        if len(l) != 3:
            raise ValidationError("Q range must be have three values: min, step, max")
        if l[0] >= l[2]:
            raise ValidationError("Q range min must be lower than max: min, step, max")
    except ValueError:
        raise ValidationError("Q range must be of the form: min,step,max")


class BioSANSConfiguration(Configuration):

    # SetAbsoluteScale(5.6e-5)
    absolute_scale_factor = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=1.0
    )

    # SolidAngle(detector_tubes=True)
    SOLID_ANGLE_CHOICES = (
        ("", "None"),
        ("detector_tubes=False, detector_wing=False", "Regular"),
        ("detector_tubes=Tubes, detector_wing=False", "Tubes"),
        ("detector_tubes=False, detector_wing=True", "Wing")
    )
    solid_angle_correction = models.CharField(
        max_length=50,
        blank=True,
        null=True,
        choices=SOLID_ANGLE_CHOICES,
        default=SOLID_ANGLE_CHOICES[0][0],
    )

    # MonitorNormalization()
    NORMALIZATION_CHOICES = (
        ("NoNormalization()", "None"),
        ("TimeNormalization()", "Time"),
        ("MonitorNormalization()", "Monitor"),
    )
    normalization = models.CharField(
        max_length=50,
        choices=NORMALIZATION_CHOICES,
        default=NORMALIZATION_CHOICES[2][0],
    )

    # IQxQy(nbins=80)
    iqxqy_nbins = models.IntegerField(
        "Number of bins for I(Qx, Qy) calculation",
        default=80,
    )

    # Mask(nx_low=2, nx_high=40, ny_low=10, ny_high=10, component_name="detector1")
    COMPONENT_CHOICES = (
        ("detector1", "Main"),
        ("wing_detector", "Wing"),
    )
    mask_component_name = models.CharField(
        "Component to apply mask settings below",
        max_length=50,
        choices=COMPONENT_CHOICES,
        default=COMPONENT_CHOICES[0][0],
        help_text="The parameters below are relative to this component",
    )
    mask_left = models.IntegerField(
        "Number of pixels masked on the left of the detector (nx_low)",
        default=0,
    )
    mask_right = models.IntegerField(
        "Number of pixels masked on the right of the detector (nx_high)",
        default=0,
    )
    mask_bottom = models.IntegerField(
        "Number of pixels masked on the bottom of the detector (ny_low)",
        default=10,
    )
    mask_top = models.IntegerField(
        "Number of pixels masked on the top of the detector (ny_high)",
        default=10,
    )
    # MaskComponent("wing_detector")
    mask_total_component_name = models.CharField(
        "Remove this component from reduction",
        max_length=50,
        choices=COMPONENT_CHOICES,
        default=COMPONENT_CHOICES[1][0],
        help_text="Totally masks this component. The name should be different from above!",
    )

    # SensitivityCorrection(main_flood, min_sensitivity=0.3, max_sensitivity=1.7, dark_current=None, use_sample_dc=False)
    flood_file = models.CharField(
        "Sensitivity correction: Flood Data",
        max_length=256,
        blank=False,
        help_text="File path"
    )
    sensitivity_min = models.DecimalField(
        max_digits=10, decimal_places=2, default=0.3)
    sensitivity_max = models.DecimalField(
        max_digits=10, decimal_places=2, default=1.7)
    sensitivity_use_sample_dc = models.BooleanField(
        "Use Sample Dark Current dor sensitivity",
        default=False,
        help_text="If use_sample_dc is set to True, the dark current data that was chosen to \
        be subtracted from the sample data will also be \
        subtracted from the flood data. The subtraction is done before the sensitivity is calculated. \
        Alternatively, a different file can be selected by specifying the dark_current parameter.",
    )
    dark_current_file = models.CharField(
        "Dark current",
        max_length=256, blank=False,
        help_text="File path")

    #DirectBeamTransmission(trans_file_name, MT_Tr, beam_radius=3,theta_dependent = False,use_sample_dc=False)
    transmission_beam_radius = models.DecimalField(
        max_digits=10, decimal_places=2, default=3.0
    )
    transmission_theta_dependent = models.BooleanField(
        "Theta Dependent Transmission",
        default=False,
        help_text="If set to False, the transmission correction will be applied by dividing \
        each pixel by the zero-angle transmission, without theta dependence.",
    )
    transmission_use_sample_dc = models.BooleanField(
        "Use Sample Dark Current for Transmission",
        default=False,
        help_text="If this is set to True, the dark current data that was chosen to be \
        subtracted from the sample data will also be subtracted from the flood data.",
    )
    # AzimuthalAverage(binning=main7m_q_range, n_subpix=1, log_binning=True, error_weighting=False)
    azimuthal_average_binning = models.CharField(
        "Q range",
        max_length=128,
        blank=False,
        validators=[validate_q_range],
        help_text="Select a Q range of the form: 'min,-step,max'. \
            Note that negtive step means log binning."
    )

    empty_beam_file = models.CharField(
        "Empty Beam Transmission file",
        max_length=256,
        blank=True,
        help_text="Note that the user can always overwrite this value!"
    )

    beam_center_file = models.CharField(
        "Beam Center file",
        max_length=256,
        blank=True,
        help_text="Note that the user can always overwrite this value!"
    )

    save_iq = models.BooleanField(
        "Save IQ data as file",
        default=False,
        help_text="If selected will save on dist the IQ curve. Usefull for \
        posterior feetings / stitching."
    )

    stiching_q_min = models.DecimalField(
        "Stiching Q min",
        max_digits=10,
        decimal_places=5,
        blank=True,
        null=True,
        help_text="Value only used for stiching. Only use for High Q Region."
    )

    stiching_q_max = models.DecimalField(
        "Stiching Q max",
        max_digits=10,
        decimal_places=5,
        blank=True,
        null=True,
        help_text="Value only used for stiching. Only use for Low Q Region."
    )
    
    @models.permalink
    def get_absolute_url(self):
        return ('sans:configuration_detail', [self.pk])


class BioSANSReduction(Reduction):

    @models.permalink
    def get_absolute_url(self):
        return ('sans:reduction_detail', [self.pk])


class BioSANSRegion(Region):
    # We can not have ForeignKey for abstract models. It has to be here!!

    reduction = models.ForeignKey(BioSANSReduction,
                                  on_delete=models.CASCADE,
                                  related_name="regions",
                                  related_query_name="region",)

    configuration = models.ForeignKey(BioSANSConfiguration, on_delete=models.CASCADE,
                                      related_name="regions",
                                      related_query_name="region")

    def __str__(self):
        return "Reduction {}".format(self.reduction.title)
