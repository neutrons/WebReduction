
import logging
from importlib import import_module

from django.conf import settings
from django.contrib.auth import get_user_model
from django.contrib.auth.models import AnonymousUser
from django.contrib.sessions.middleware import SessionMiddleware
from django.test import Client, RequestFactory, TestCase
from django.urls import reverse

from server.apps.users.models import UserProfile
from server.settings.env import env

from .models import Facility, Instrument
from .views import Instruments, IPTSs

logger = logging.getLogger(__name__)


# logging.basicConfig()
# logging.getLogger().setLevel(logging.DEBUG)
# req_log = logging.getLogger('requests.packages.urllib3')
# req_log.setLevel(logging.DEBUG)
# req_log.propagate = True

class CatalogTest(TestCase):

    fixtures = ['catalog']

    def setUp(self):
        self.client = Client()
        self.factory = RequestFactory()

    def test_list_instruments(self):
        """
        """
        # create and set user
        dummy_user = get_user_model().objects.create_user(
            'john',
            'lennon@thebeatles.com',
            'johnpassword'
        )
        dummy_profile = UserProfile(**{
            'user': dummy_user,
            'home_institution': 'Test',
            'facility': Facility.objects.get(pk=2),
            'instrument': Instrument.objects.get(pk=3),
        })
        # Setup request and view.
        request = self.factory.get(reverse('catalog:list_instruments'))
        request.user = dummy_user
        view = Instruments.as_view()
        response = view(request)
        # Check.
        self.assertEqual(response.status_code, 200)
        self.assertTrue('VULCAN' in [inst['name'] for inst in
                        response.context_data['instruments']])

    def test_list_IPTSs_EQSANS(self):
        '''
        '''

        instrument = 'EQSANS'

        user = get_user_model().objects.create_user(
            env("TEST_USERNAME"),
            'dummy@email.com',
            env("TEST_PASSWORD")
        )
        profile = UserProfile(**{
            'user': user,
            'home_institution': 'Test',
            'facility': Facility.objects.get(pk=2),
            'instrument': Instrument.objects.get(name=instrument),
            'ipts': 'IPTS-19800',
        })
        profile.save()

        # Setup request and view.
        request = self.factory.get(
            reverse('catalog:list_iptss', kwargs={'instrument': instrument})
        )
        request.user = user
        request.session = {'password': env("TEST_PASSWORD")}

        view = IPTSs.as_view()
        response = view(request, instrument=instrument)
        
        # Check.
        self.assertEqual(response.status_code, 200)
        self.assertTrue(response.context_data['iptss'])
    
    def test_list_IPTSs_GPSANS(self):
        '''
        '''

        instrument = 'CG2'

        user = get_user_model().objects.create_user(
            env("TEST_USERNAME"),
            'dummy@email.com',
            env("TEST_PASSWORD")
        )
        profile = UserProfile(**{
            'user': user,
            'home_institution': 'Test',
            'facility': Facility.objects.get(pk=1),
            'instrument': Instrument.objects.get(icat_name=instrument),
            'ipts': 'IPTS-19748',
            'experiment': 'exp240',
        })
        profile.save()

        # Setup request and view.
        request = self.factory.get(
            reverse('catalog:list_iptss', kwargs={'instrument': instrument})
        )
        request.user = user
        request.session = {'password': env("TEST_PASSWORD")}

        view = IPTSs.as_view()
        response = view(request, instrument=instrument)
        
        # Check.
        self.assertEqual(response.status_code, 200)
        self.assertTrue(response.context_data['iptss'])
