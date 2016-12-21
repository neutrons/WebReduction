from django.contrib import admin

from .biosans.models import BioSANSConfiguration, BioSANSRegion, BioSANSReduction 
                    
# Register your models here.
admin.site.register(BioSANSConfiguration)
admin.site.register(BioSANSReduction)
admin.site.register(BioSANSRegion)
