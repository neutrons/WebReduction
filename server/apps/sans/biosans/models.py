################################################################################
# BIOSANS
################################################################################

from ..models import *

class BioSANSConfiguration(Configuration):
    
    absolute_scale_factor = models.DecimalField(
        max_digits=10, decimal_places=2, default=1.0)
    sample_thickness = models.DecimalField(
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
    configuration = models.ForeignKey(BioSANSConfiguration, on_delete=models.CASCADE,
                                      related_name="reductions",
                                      related_query_name="reduction",
                                      blank=True, null=True,)
    
    @models.permalink
    def get_absolute_url(self):
        return ('sans:biosans:reduction_detail', [self.pk])

    # Needed to generate the script from this object
    script_file = os.path.join(os.path.dirname(os.path.abspath(__file__)),"scripts","template.py")


class BioSANSEntry(Entry):
    # We can not have ForeignKey for abstract models. It has to be here!!
    reduction = models.ForeignKey(BioSANSReduction,
                                      on_delete=models.CASCADE,
                                      related_name="entries",
                                      related_query_name="entry",)
    
    def __str__(self):
        return "Entry: %s :: Reduction: %s" % (self.save_name, self.reduction.title)