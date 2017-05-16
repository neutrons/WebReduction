from django.contrib import admin
from .models import User, UserProfile, Experiment, Ipts

admin.site.register(User)
admin.site.register(UserProfile)
admin.site.register(Experiment)
admin.site.register(Ipts)