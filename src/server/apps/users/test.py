
from django.test import TestCase
from django.contrib.auth import get_user_model
from django.test import Client
import unittest
from server.settings.env import env
from django.contrib.auth.models import User
from django.test.client import RequestFactory
from django.test import Client

from .views import ProfileView, ProfileCreate, ProfileUpdate
from .models import UserProfile

class TestLogin(TestCase):
    def setUp(self):
        # get_user_model().objects.create_user(username=env(
        #     "TEST_USERNAME"), password=env("TEST_PASSWORD"))
        self.c = Client()

    def test_login(self):
        login = self.client.login(username=env(
            "TEST_USERNAME"), password=env("TEST_PASSWORD"))
        self.assertTrue(login)
    
    def test_login_pafe(self):
        response = self.c.get('/users/login/')

        print(response)
        print(dir(response))
        self.assertEqual(200, response.status_code, "Expected ok status.")

        response = self.c.post('/users/login/', dict(
            username=env("TEST_USERNAME"), password=env("TEST_PASSWORD")
        ))
        
        self.assertEqual(302, response.status_code, "Expected ok redirect status.")
        
        response = self.c.get('/users/login/')
        self.assertEqual(200, response.status_code, "Expected ok status.")
        

class TestUserProfileDummyUser(TestCase):
    '''

    '''
    fixtures = ['catalog', 'jobs']

    def setUp(self):
        # Every test needs access to the request factory.
        self.factory = RequestFactory()
        self.client = Client()
        
    def test_view_profile(self):

        dummy_user = get_user_model().objects.create_user('john', 'lennon@thebeatles.com', 'johnpassword')

        request = self.factory.get('/users/profile')
        request.user = dummy_user

        # redirect
        response = ProfileView.as_view()(request)
        self.assertEqual(response.status_code, 302)

        # User profile inexistant => create a new user profile
        response = ProfileCreate.as_view()(request)
        self.assertEqual(response.status_code, 200)
    
    def test_create_profile(self):

        login = self.client.login(username=env(
            "TEST_USERNAME"), password=env("TEST_PASSWORD"))
        self.assertTrue(login)

        user = get_user_model().objects.get(username=env(
            "TEST_USERNAME"))
        
        self.assertEqual(user.username, env(
            "TEST_USERNAME"))

        response = self.client.post('/users/profile/create', {
            'user': user,
            'home_institution': 'Test',
            'facility': 1,
            'instrument': 2,
            'ipts': 'IPTS-828',
            'experiment': 'exp100'
        }, follow=True)

        print(UserProfile.objects.all())
        user_profile = UserProfile.objects.get(user__username=env(
            "TEST_USERNAME"))

        self.assertEqual(user_profile.user.username, env(
            "TEST_USERNAME"))

        print(response.redirect_chain)
        self.assertEqual(response.status_code, 200)
