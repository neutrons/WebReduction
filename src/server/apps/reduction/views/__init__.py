from server.util.path import import_class_from_module

def _get_class_view(request, name):
    '''
    Just used to get CBVs
    '''
    instrument = request.user.profile.instrument
    facility = instrument.facility
    class_imported = import_class_from_module("server.apps.configuration.views", facility, instrument, name)
    return class_imported


def configuration_list(request, *args, **kwargs):
    class_imported = _get_class_view(request, "ConfigurationList")
    view = class_imported.as_view()(request, *args, **kwargs)
    return view

def configuration_detail(request, *args, **kwargs):
    class_imported = _get_class_view(request, "ConfigurationDetail")
    view = class_imported.as_view()(request, *args, **kwargs)
    return view

def configuration_create(request, *args, **kwargs):
    class_imported = _get_class_view(request, "ConfigurationCreate")
    view = class_imported.as_view()(request, *args, **kwargs)
    return view

def configuration_update(request, *args, **kwargs):
    class_imported = _get_class_view(request, "ConfigurationUpdate")
    view = class_imported.as_view()(request, *args, **kwargs)
    return view

def configuration_delete(request, *args, **kwargs):
    class_imported = _get_class_view(request, "ConfigurationDelete")
    view = class_imported.as_view()(request, *args, **kwargs)
    return view
    
def configuration_clone(request, *args, **kwargs):
    class_imported = _get_class_view(request, "ConfigurationClone")
    view = class_imported.as_view()(request, *args, **kwargs)
    return view
    
def configuration_assign_list_uid(request, *args, **kwargs):
    class_imported = _get_class_view(request, "ConfigurationAssignListUid")
    view = class_imported.as_view()(request, *args, **kwargs)
    return view
    
def configuration_assign_list_ipts(request, *args, **kwargs):
    class_imported = _get_class_view(request, "ConfigurationAssignListIpts")
    view = class_imported.as_view()(request, *args, **kwargs)
    return view
    
def configuration_assign_uid(request, *args, **kwargs):
    class_imported = _get_class_view(request, "ConfigurationAssignUid")
    view = class_imported.as_view()(request, *args, **kwargs)
    return view
    
def configuration_assign_ipts(request, *args, **kwargs):
    class_imported = _get_class_view(request, "ConfigurationAssignIpts")
    view = class_imported.as_view()(request, *args, **kwargs)
    return view
    