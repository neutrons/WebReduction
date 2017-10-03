
from importlib import import_module

from django.conf import settings
from django.contrib.auth import get_user_model
from django.contrib.sessions.middleware import SessionMiddleware
from django.test import Client, RequestFactory, TestCase
from django.urls import reverse
from django.contrib.auth.models import AnonymousUser

from server.apps.users.models import UserProfile

from .models import Facility, Instrument
from .views import Instruments, IPTSs

from server.settings.env import env

class CatalogTestCase(TestCase):

    fixtures = ['catalog']

    def setUp(self):
        self.client = Client()
        self.factory = RequestFactory()

        # # create and set user
        # dummy_user = get_user_model().objects.create_user(
        #     'john',
        #     'lennon@thebeatles.com',
        #     'johnpassword'
        # )

        
    def test_list_instruments(self):
        """
        """

        # create and set user
        dummy_user = get_user_model().objects.create_user(
            'john',
            'lennon@thebeatles.com',
            'johnpassword'
        )
        # Setup request and view.
        request = self.factory.get(reverse('catalog:list_instruments'))
        request.user = dummy_user
        view = Instruments.as_view()
        response = view(request)
        # Check.
        self.assertEqual(response.status_code, 200)
        self.assertTrue('VULCAN' in [inst['name'] for inst in
                        response.context_data['instruments']])

    def test_list_IPTSs(self):
        '''
        '''

        user = get_user_model().objects.create_user(
            env("TEST_USERNAME"),
            'lennon@thebeatles.com',
            env("TEST_PASSWORD")
        )
        # login = self.client.login(username=env(
        #     "TEST_USERNAME"), password=env("TEST_PASSWORD"))
        # self.assertTrue(login)

        # user = get_user_model().objects.get(username=env("TEST_USERNAME"))
        dummy_profile = UserProfile(**{
            'user': user,
            'home_institution': 'Test',
            'facility': Facility.objects.get(pk=2),
            'instrument': Instrument.objects.get(pk=3),
            'ipts': 'IPTS-19800',
        })
        dummy_profile.save()
        

        instrument = 'EQSANS'
        # Setup request and view.
        request = self.factory.get(reverse('catalog:list_iptss',
                                           kwargs={'instrument': instrument}))
        request.user = user
        request.session = {'password': env("TEST_PASSWORD")}

        view = IPTSs.as_view()
        response = view(request, instrument=instrument)
        # Check.
        self.assertEqual(response.status_code, 200)