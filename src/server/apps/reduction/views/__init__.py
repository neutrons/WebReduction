from server.util.path import import_class_from_module

def _get_class_view(request, name):
    '''
    Just used to get CBVs
    '''
    instrument = request.user.profile.instrument
    facility = instrument.facility
    class_imported = import_class_from_module("server.apps.reduction.views", facility, instrument, name)
    return class_imported


def reduction_list(request, *args, **kwargs):
    class_imported = _get_class_view(request, "ReductionList")
    view = class_imported.as_view()(request, *args, **kwargs)
    return view

def reduction_create(request, *args, **kwargs):
    class_imported = _get_class_view(request, "ReductionCreate")
    view = class_imported.as_view()(request, *args, **kwargs)
    return view

def reduction_detail(request, *args, **kwargs):
    class_imported = _get_class_view(request, "ReductionDetail")
    view = class_imported.as_view()(request, *args, **kwargs)
    return view

def reduction_update(request, *args, **kwargs):
    class_imported = _get_class_view(request, "ReductionUpdate")
    view = class_imported.as_view()(request, *args, **kwargs)
    return view

def reduction_delete(request, *args, **kwargs):
    class_imported = _get_class_view(request, "ReductionDelete")
    view = class_imported.as_view()(request, *args, **kwargs)
    return view

def reduction_clone(request, *args, **kwargs):
    class_imported = _get_class_view(request, "ReductionClone")
    view = class_imported.as_view()(request, *args, **kwargs)
    return view

def reduction_script_update(request, *args, **kwargs):
    class_imported = _get_class_view(request, "ReductionScriptUpdate")
    view = class_imported.as_view()(request, *args, **kwargs)
    return view
