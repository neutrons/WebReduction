from django.contrib import admin

from .models import (
    SansHfirBiosansReduction, SansHfirBiosansRegion,
    SansHfirGpsansReduction, SansHfirGpsansRegion,
    SpectrometrySnsHyspecReduction, SpectrometrySnsHyspecRegion,
)

# Register your models here.
admin.site.register(SansHfirBiosansReduction)
admin.site.register(SansHfirBiosansRegion)
admin.site.register(SansHfirGpsansReduction)
admin.site.register(SansHfirGpsansRegion)
admin.site.register(SpectrometrySnsHyspecReduction)
admin.site.register(SpectrometrySnsHyspecRegion)


