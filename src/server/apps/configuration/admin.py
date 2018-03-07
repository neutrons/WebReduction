from django.contrib import admin

from .models import (
    SpectrometrySnsHyspecConfiguration,
    SansHfirBiosansConfiguration,
    SansHfirGpsansConfiguration,
)

# Register your models here.
admin.site.register(SpectrometrySnsHyspecConfiguration)
admin.site.register(SansHfirBiosansConfiguration)
admin.site.register(SansHfirBiosansConfiguration)
