from django.contrib import admin

from .models.sans.hfir import biosans, gpsans
from .models.spectrometry.sns import hyspec

# Register your models here.
admin.site.register(biosans.Reduction)
admin.site.register(gpsans.Reduction)
admin.site.register(hyspec.Reduction)
admin.site.register(biosans.Region)
admin.site.register(gpsans.Region)
admin.site.register(hyspec.Region)

