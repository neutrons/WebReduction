from django.contrib import admin

from .biosans.models import BioSANSConfiguration, BioSANSRegion, BioSANSReduction 
from .gpsans.models import GPSANSConfiguration, GPSANSRegion, GPSANSReduction

# Register your models here.
admin.site.register(BioSANSConfiguration)
admin.site.register(BioSANSReduction)
admin.site.register(BioSANSRegion)

admin.site.register(GPSANSConfiguration)
admin.site.register(GPSANSReduction)
admin.site.register(GPSANSRegion)