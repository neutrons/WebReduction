from django.contrib import admin

from .biosans.models import BioSANSConfiguration, BioSANSEntry, BioSANSReduction 
                    
# Register your models here.
admin.site.register(BioSANSConfiguration)
admin.site.register(BioSANSEntry)
admin.site.register(BioSANSReduction)