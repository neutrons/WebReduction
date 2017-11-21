
from django.contrib.auth import get_user_model
from django.test import Client, TestCase
from django.test.client import RequestFactory
from django.urls import reverse

from server.settings.env import env

from .models import UserProfile
from .views import ProfileCreate, ProfileView


class TestLogin(TestCase):
    '''
    To test:
    ./manage.py test server.apps.users
    '''

    fixtures = ['catalog', 'jobs']

    def setUp(self):
        self.client = Client()
        self.factory = RequestFactory()

    def test_login_function_real_credentials(self):
        login = self.client.login(
            username=env("TEST_USERNAME"),
            password=env("TEST_PASSWORD"),
        )
        self.assertTrue(login)

    def test_login_real_credentials_return_code(self):

        response = self.client.get(reverse('users:login'))
        self.assertEqual(200, response.status_code, "Expected ok status.")

        response = self.client.post(
            '/users/login',
            dict(
                username=env("TEST_USERNAME"),
                password=env("TEST_PASSWORD"),
            ),
        )

        self.assertEqual(302, response.status_code,
                         "Expected redirect status to profile create.")

        # "Expected redirect status to profile create.
        response = self.client.get(reverse('users:profile_view'), follow=True,)
        self.assertEqual(200, response.status_code, "Expected ok status.")

    def test_factory_dummy_user(self):

        # create and set user
        dummy_user = get_user_model().objects.create_user(
            'john',
            'lennon@thebeatles.com',
            'johnpassword'
        )
        request = self.factory.get(reverse('users:login'))
        request.user = dummy_user

        # redirect to create profile
        # User profile inexistant => create a new user profile
        response = ProfileView.as_view()(request)
        self.assertEqual(response.status_code, 302)

        response = ProfileCreate.as_view()(request)
        self.assertEqual(response.status_code, 200)

    def test_create_profile(self):
        '''
        To run this test:
        ./manage.py test server.apps.users.test.TestLogin.test_create_profile
        '''
        login = self.client.login(username=env(
            "TEST_USERNAME"), password=env("TEST_PASSWORD"))
        self.assertTrue(login)

        user = get_user_model().objects.get(username=env("TEST_USERNAME"))
        self.assertEqual(user.username, env("TEST_USERNAME"))

        response = self.client.post(
            reverse('users:profile_catalog_create'),
            {
                'user': user,
                'home_institution': 'Test',
                'facility': 1,
                'instrument': 2,
                'ipts': 'IPTS-828',
                'experiment': 'exp100'
            },
            follow=True
        )

        user_profile = UserProfile.objects.get(
            user__username=env("TEST_USERNAME"))

        self.assertEqual(user_profile.user.username, env("TEST_USERNAME"))
        
        # response.redirect_chain = [('/', 302), ('/users/profile', 302)]
        self.assertTrue(
            reverse('users:profile_view') in [
                red[0] for red in response.redirect_chain])
        self.assertEqual(response.status_code, 200)
