from django.test import TestCase

from server.apps.catalog.models import Facility, Instrument
from .path import build_fields

class TestPath(TestCase):

    fixtures = ['catalog.json', ]

    def test_build_fields(self):
        facility = Facility.objects.get(name="HFIR")
        instrument = Instrument.objects.get(name="GPSANS")
        self.assertEqual(
            build_fields(facility, instrument),
            ['sans', 'hfir', 'gpsans']
        )
