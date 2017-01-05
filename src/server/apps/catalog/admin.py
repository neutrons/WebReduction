
from django.contrib import admin
from . import models


# Register your models here.
@admin.register(models.Facility)
class FacilityAdmin(admin.ModelAdmin):
    pass


@admin.register(models.Instrument)
class InstrumentAdmin(admin.ModelAdmin):
    pass
