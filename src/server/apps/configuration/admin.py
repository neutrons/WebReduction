from django.contrib import admin

from .models.sans.hfir import biosans, gpsans
from .models.spectrometry.sns import hyspec

# Register your models here.
admin.site.register(biosans.Configuration)
admin.site.register(gpsans.Configuration)
admin.site.register(hyspec.Configuration)
