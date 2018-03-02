import os.path
from django.conf import settings

def _build_lists(fields, prefix=[], suffix=None):
    '''
    @param::fields is a list

    >>> build_lists(["a","b","c"], ["server","apps", "configuration"])
    [['server', 'apps', 'configuration', 'a', 'b', 'c', None],
    ['server', 'apps', 'configuration', 'a', 'b', None],
    ['server', 'apps', 'configuration', 'a', None],
    ['server', 'apps', 'configuration', None]]

    '''

    while len(fields) > 0:
        l = [*prefix, *fields, suffix]
        fields.pop()
        return [l] + _build_lists(fields, prefix, suffix)
    return [[*prefix, suffix]]


def _build_fields(facility_obj, instrument_obj):
    '''
    Build fields from objects
    >>> from server.apps.catalog.models import Facility, Instrument
    >>> facility = Facility.objects.get(name="HFIR")
    >>> instrument = Instrument.objects.get(name="GPSANS")
    >>> build_fields(facility, instrument)
    ['sans', 'hfir', 'gpsans']
    '''
    return [
        instrument_obj.technique.lower(),
        facility_obj.name.lower(),
        instrument_obj.name.lower(),
    ]


def _build_fields_with_separator(facility_obj, instrument_obj, prefix=[],
                                 suffix=None, separator=os.path.sep):
    '''
    '''
    fields = _build_fields(facility_obj, instrument_obj)
    options = _build_lists(fields, prefix, suffix)
    # Remove the None
    options = [list(filter(None, l)) for l in options]
    return [separator.join(x) for x in options]


def _import_from(module, name):
    '''
    MyClass = import_from("module.package", "MyClass")
    object = MyClass()
    '''
    module = __import__(module, fromlist=[name])
    return getattr(module, name)


def import_class(facility_obj, instrument_obj, class_name, prefix=[],
                 suffix=None, separator=os.path.sep):
    '''
    This will import the first class found from the structure
    technique/facility/instrument/module
    technique/facility/module
    technique/module
    module

    >>> import_class(facility, instrument, "Form", "configuration",
        "forms"
    '''

    files = _build_fields_with_separator(facility_obj, instrument_obj, prefix,
                                         suffix)

    for f in files:
        f = settings.ROOT_DIR(f)
        f = f if f.endswith(".py") else f + ".py"
        if os.path.exists(f) and os.path.isfile(f):
            #TODO
            _import_from()
            return f
    return None







