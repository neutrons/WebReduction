
from django.test import TestCase
from django.contrib.auth import get_user_model
from django.test import Client
import unittest
from server.settings.env import env


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
        
