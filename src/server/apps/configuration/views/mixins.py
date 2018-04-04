import logging
import os

logger = logging.getLogger(__name__)  # pylint: disable=C0103


class ConfigurationMixin(object):
    '''
    Sets everything for configuration
    When the form_class is defined the model is only used if needed!
    '''

    # Django stuff
    model = None
    form_class = None

    # usefull
    facility_obj = None
    instrument_obj = None

    def dispatch(self, request, *args, **kwargs):
        '''
        ** Overload **
        First method to be called in a View
        It sets the member variables
        '''

        self.instrument_obj = self.request.user.profile.instrument
        self.facility_obj = self.instrument_obj.facility

        return super(ConfigurationMixin, self).dispatch(request, *args, **kwargs)

    def get_queryset(self):
        '''
        Make sure the user only accesses its configurations
        '''
        return self.model.objects.filter(user=self.request.user)
