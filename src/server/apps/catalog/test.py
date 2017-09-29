import unittest
from django.test import RequestFactory
from django.test import TestCase
from django.conf import settings
from django.utils.importlib import import_module

class CatalogTestCase(TestCase):

    def setUp(self):
        # http://code.djangoproject.com/ticket/10899
        settings.SESSION_ENGINE = 'django.contrib.sessions.backends.file'
        engine = import_module(settings.SESSION_ENGINE)
        store = engine.SessionStore()
        store.save()
        self.session = store
        self.client.cookies[settings.SESSION_COOKIE_NAME] = store.session_key
    
    def test_get(self):
        """
        HelloView.get() sets 'name' in response context.
        """
        
        # Setup name.
        name = 'peter'
        # Setup request and view.
        request = RequestFactory().get('/fake-path')
        view = HelloView.as_view(template_name='hello.html')
        # Run.
        response = view(request, name=name)
        # Check.
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.template_name[0], 'home.html')
        self.assertEqual(response.context_data['name'], name)