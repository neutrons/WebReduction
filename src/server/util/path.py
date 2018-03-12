import os.path
from django.conf import settings
import logging
import importlib

logger = logging.getLogger(__name__)  # pylint: disable=C0103


import doctest
__test__ = {
    'Doctest': doctest
}

def _build_lists(fields, prefix=[], suffix=None):
    '''
    @param::fields is a list

    >>> _build_lists(["a","b","c"], ["server","apps", "configuration"])
    [['server', 'apps', 'configuration', 'a', 'b', 'c', None],
    ['server', 'apps', 'configuration', 'a', 'b', None],
    ['server', 'apps', 'configuration', 'a', None],
    ['server', 'apps', 'configuration', None]]

    '''
    if suffix is None:
        suffix = []
    elif type(suffix) == str:
        suffix = [suffix]

    while len(fields) > 0:
        l = [*prefix, *fields, *suffix]
        fields.pop()
        return [l] + _build_lists(fields, prefix, suffix)
    return [[*prefix, *suffix]]


def _build_fields(facility_obj, instrument_obj):
    '''
    Build fields from objects
    >>> from server.apps.catalog.models import Facility, Instrument
    >>> facility = Facility.objects.get(name="HFIR")
    >>> instrument = Instrument.objects.get(name="GPSANS")
    >>> _build_fields(facility, instrument)
    ['sans', 'hfir', 'gpsans']
    '''
    return [
        instrument_obj.technique.lower(),
        facility_obj.name.lower(),
        instrument_obj.name.lower(),
    ]


def _build_fields_with_separator(facility_obj, instrument_obj, prefix=[],
                                 suffix=None, separator=os.path.sep,
                                 camel_case=False):
    '''
    >>> from server.apps.catalog.models import Facility, Instrument
    >>> facility = Facility.objects.get(name="HFIR")
    >>> instrument = Instrument.objects.get(name="GPSANS")
    >>> _build_fields_with_separator(facility, instrument, prefix=[
            "server","apps", "configuration"], suffix="forms.py")
    ['server/apps/configuration/sans/hfir/gpsans/forms.py',
    'server/apps/configuration/sans/hfir/forms.py',
    'server/apps/configuration/sans/forms.py',
    'server/apps/configuration/forms.py']
    '''
    fields = _build_fields(facility_obj, instrument_obj)
    options = _build_lists(fields, prefix, suffix)
    # Remove the None
    options = [list(filter(None, l)) for l in options]
    if camel_case:
        options = [[i.title() for i in l] for l in options]
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

    >>> from server.apps.catalog.models import Facility, Instrument
    >>> facility = Facility.objects.get(name="HFIR")
    >>> instrument = Instrument.objects.get(name="GPSANS")
    >>> MyClass = import_class(facility, instrument, "IPTSs", prefix=[
            "server","apps", "catalog"], suffix="views.py")
    >>> MyClass
        server.apps.catalog.views.IPTSs
    >>> o = MyClass()
    >>> o.http_method_names
        ['get', 'post', 'put', 'patch', 'delete', 'head', 'options', 'trace']

    '''

    files = _build_fields_with_separator(facility_obj, instrument_obj, prefix,
                                         suffix)
    for f in files:
        f = settings.ROOT_DIR(f)
        f = f if f.endswith(".py") else f + ".py"
        logger.debug("Trying path: {}".format(f))
        if os.path.exists(f) and os.path.isfile(f):
            f = f.split(settings.ROOT_DIR()+"/")[-1]
            f = f.split(".")[-2]
            f = f.replace(os.path.sep, '.')
            imp_class = _import_from(f, class_name)
            return imp_class
    return None


def import_class_from_module(module_root, facility_obj, instrument_obj, suffix):
    '''
    import modules
    >>> from server.apps.catalog.models import Facility, Instrument
    >>> facility = Facility.objects.get(name="SNS")
    >>> instrument = Instrument.objects.get(name="HYSPEC")
    >>> import_class_from_module("server.apps.configuration.models", facility, instrument, "Configuration")
    server.apps.configuration.models.spectrometry_sns_hyspec.SpectrometrySnsHyspecConfiguration

    '''
    classes = _build_fields_with_separator(
        facility_obj, instrument_obj, prefix=[], suffix=suffix,
        camel_case=True, separator="")

    for c in classes:
        try:
            logger.debug("import_class_from_module :: Trying {} {}".format(module_root, c))
            imp_class = _import_from(module_root, c)
            logger.debug("import_class_from_module :: GOT: {} {}".format(module_root, c))
            return imp_class
        except AttributeError:
            logger.debug("import_class_from_module :: Trying another...")
            pass
    logger.error("import_class_from_module :: Couldn't get any class. Last tried: {} {}".format(module_root, c))
    return None





