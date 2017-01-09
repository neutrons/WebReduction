################################################################################
# BIOSANS
################################################################################

from ..models import *

class BioSANSConfiguration(Configuration):

    wavelength = models.DecimalField(
        u'Wavelength (\u212B)',
        max_digits=4,
        decimal_places=2,
        blank=True,
        null=True,
        help_text= "If empty uses the value set in the data file."
    )

    wavelength_spread = models.DecimalField(
        'Wavelength Spread (%)',
        max_digits=3,
        decimal_places=2,
        blank=True,
        null=True,
        help_text="If empty uses the value set in the data file."
    )
    
    sample_detector_distance = models.DecimalField(
        'Sample Detector Distance (m)',
        max_digits=5,
        decimal_places=3,
        blank=True,
        null=True,
        help_text="(in meters) If empty uses the value set in the data file."
    )
    
    SOLID_ANGLE_CHOICES = (
        ("", "None"), #
        ("detector_tubes=False, detector_wing=False", "Regular"),
        ("detector_tubes=Tubes, detector_wing=False", "Tubes"),
        ("detector_tubes=False, detector_wing=True", "Wing")
    )
    
    solid_angle_correction = models.CharField(
        max_length=50,
        choices=SOLID_ANGLE_CHOICES,
        default=SOLID_ANGLE_CHOICES[0][0],
    )
        
    absolute_scale_factor = models.DecimalField(
        max_digits=10, decimal_places=2, default=1.0)
    
    sample_aperture_diameter = models.DecimalField(
        max_digits=10, decimal_places=2, default=10.0)
    
    direct_beam_file = models.CharField(max_length=256, blank=True, help_text="File path")
    mask_file = models.CharField(max_length=256, blank=True, help_text="File path")
    dark_current_file = models.CharField(max_length=256, blank=True, help_text="File path")
    sensitivity_file = models.CharField(max_length=256, blank=True, help_text="File path")
        
    sensitivity_min = models.DecimalField(
        max_digits=10, decimal_places=2, default=0.4)
    sensitivity_max = models.DecimalField(
        max_digits=10, decimal_places=2, default=2.0)
    

    @models.permalink
    def get_absolute_url(self):
        return ('sans:biosans:configuration_detail', [self.pk])

class BioSANSReduction(Reduction):
    
    @models.permalink
    def get_absolute_url(self):
        return ('sans:biosans:reduction_detail', [self.pk])

    # Needed to generate the script from this object
    script_file = os.path.join(os.path.dirname(os.path.abspath(__file__)),"scripts","template.py")


class BioSANSRegion(Region):
    # We can not have ForeignKey for abstract models. It has to be here!!
    empty_beam = models.CharField(max_length=256)

    reduction = models.ForeignKey(BioSANSReduction,
                                      on_delete=models.CASCADE,
                                      related_name="regions",
                                      related_query_name="region",)
    
    configuration = models.ForeignKey(BioSANSConfiguration, on_delete=models.CASCADE,
                                      related_name="regions",
                                      related_query_name="region")
    def __str__(self):
        return "Reduction {} -> Entry {}".format(self.reduction.title, self.region)
