import os.path
from django.conf import settings
import logging
import importlib

logger = logging.getLogger(__name__)  # pylint: disable=C0103

import doctest
__test__ = {
    'Doctest': doctest
}

def _objects_to_list(facility_obj, instrument_obj):
    '''
    Build fields from objects
    >>> from server.apps.catalog.models import Facility, Instrument
    >>> facility = Facility.objects.get(name="HFIR")
    >>> instrument = Instrument.objects.get(name="GPSANS")
    >>> _objects_to_list(facility, instrument)
    ['sans', 'hfir', 'gpsans']
    '''
    return [
        instrument_obj.technique.lower(),
        facility_obj.name.lower(),
        instrument_obj.name.lower(),
    ]

def _folders_to_possible_modules(folders, prefix=None, suffix=None, separator="."):
    '''
    @param::folders is a list of folders
    @return a list of possible modules
    >>> _folders_to_possible_modules(['sans', 'hfir', 'gpsans'],
        prefix="server.apps.configuration.views", suffix=None, separator=".")
    ['server.apps.configuration.views.sans.hfir.gpsans',
     'server.apps.configuration.views.sans.hfir',
     'server.apps.configuration.views.sans']
    
    >>> _folders_to_possible_modules(['sans', 'hfir', 'gpsans'],
        prefix="server.apps.configuration.views", suffix="Configuration", separator=".")
    ['server.apps.configuration.views.sans.hfir.gpsans.Configuration',
     'server.apps.configuration.views.sans.hfir.Configuration',
     'server.apps.configuration.views.sans.Configuration']
    '''

    while len(folders) > 0:
        module = (prefix + separator) if prefix else ""
        module += separator.join(folders)
        module +=  (separator + suffix) if suffix else ""
        folders.pop()
        return [module] + _folders_to_possible_modules(folders, prefix, suffix, separator)
    return []


def _import_from(module, name):
    '''
    MyClass = _import_from("module.package", "MyClass")
    object = MyClass()
    '''
    module = __import__(module, fromlist=[name])
    return getattr(module, name)


def import_class_from_module(module_root, facility_obj, instrument_obj, class_name):
    '''
    
    '''

    possible_folders_list = _objects_to_list(facility_obj, instrument_obj)
    possible_modules_list = _folders_to_possible_modules(possible_folders_list, module_root)

    for module in possible_modules_list:
        try:
            logger.debug("import_class_from_module :: Trying {} {}".format(module, class_name))
            imp_class = _import_from(module, class_name)
            logger.debug("import_class_from_module :: GOT: {} {}".format(module, class_name))
            return imp_class
        except AttributeError:
            logger.debug("import_class_from_module :: Trying another...")
            pass
    logger.error("import_class_from_module :: Couldn't get any class. Last tried: {} {}".format(
            module, class_name))
    return None





