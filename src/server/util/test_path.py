from django.test import TestCase

from server.apps.catalog.models import Facility, Instrument
from .path import(
    _objects_to_list,
    _folders_to_possible_modules,
    _import_from,
    import_class_from_module
)

class TestPath(TestCase):
    '''
    Run as: ./manage.py test server.util.test_path
    '''

    fixtures = ['catalog.json', ]

    def test_objects_to_list(self):
        facility = Facility.objects.get(name="HFIR")
        instrument = Instrument.objects.get(name="GPSANS")
        self.assertEqual(
            _objects_to_list(facility, instrument),
            ['sans', 'hfir', 'gpsans']
        )
    
    def test_folders_to_possible_modules(self):
        self.assertEqual(
            _folders_to_possible_modules(['sans', 'hfir', 'gpsans'],
                prefix="server.apps.configuration.views", suffix=None, separator="."),

            ['server.apps.configuration.views.sans.hfir.gpsans',
            'server.apps.configuration.views.sans.hfir',
            'server.apps.configuration.views.sans']
        )

        self.assertEqual(
            _folders_to_possible_modules(['sans', 'hfir', 'gpsans'],
                prefix="server.apps.configuration.views", suffix="Configuration", separator="."),

            ['server.apps.configuration.views.sans.hfir.gpsans.Configuration',
            'server.apps.configuration.views.sans.hfir.Configuration',
            'server.apps.configuration.views.sans.Configuration']
        )

    def test_import_from(self):
        class_imported = _import_from("server.apps.configuration.models.sans.hfir.biosans", "Configuration")
        self.assertEqual(class_imported.__name__, "ConfigurationBioSANS")
    
    def test_import_class_from_module(self):
        facility = Facility.objects.get(name="HFIR")
        instrument = Instrument.objects.get(name="GPSANS")

        class_imported = import_class_from_module("server.apps.configuration.models", facility, instrument, "Configuration")
        self.assertEqual(class_imported.__name__, "ConfigurationGPSANS")