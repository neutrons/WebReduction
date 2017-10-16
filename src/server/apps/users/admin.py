from django.contrib.sessions.models import Session
from django.contrib import admin
from pprint import pformat

from .models import User, UserProfile

admin.site.register(User)
admin.site.register(UserProfile)


class SessionAdmin(admin.ModelAdmin):
    '''
    To show session info in the admin interface
    '''
    def _session_data(self, obj):
        return pformat(obj.get_decoded()).replace('\n', '<br>\n')
    
    _session_data.allow_tags = True
    list_display = ['session_key', '_session_data', 'expire_date']
    readonly_fields = ['_session_data']
    exclude = ['session_data']
    date_hierarchy = 'expire_date'


admin.site.register(Session, SessionAdmin)
