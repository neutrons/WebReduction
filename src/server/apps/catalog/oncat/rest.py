import json
import logging
import sys
from pprint import pformat, pprint
from django.conf import settings
from django.core import signing
import requests

import oauthlib
import requests_oauthlib

logger = logging.getLogger(__name__)

"""
Generic definitions for REST / OAuth comunication with OnCat
Do not implement here any filtering to the output json!!!
"""


class TokenStorage(object):
    '''
    Class to store the token in the session
    I'm assuming that the password and the user exist already in the session
    '''
    def __init__(self, request):
        '''
        '''
        self._request = request

    @property
    def token(self):
        '''
        Fetch token from the session
        '''
        return self._request.session.get('token')

    @token.setter
    def token(self, val):
        '''
        Set it in the session
        '''
        self._request.session['token'] = val

    def set_token(self, val):
        '''
        Set it in the session
        @token.setter does not work in the function below....
        '''
        logger.debug("New token set:\n%s", pformat(val))
        self._request.session['token'] = val

    @property
    def username(self):
        '''
        Fecth username from the session
        '''
        return self._request.user.username

    @property
    def password(self):
        '''
        Fecth password from the session
        '''
        password_encrypted = self._request.session["password"]
        password = signing.loads(password_encrypted)
        return password


class OAuthClient(object):
    '''
    '''

    def __init__(self, request):
        '''
        This makes sure we have a valid token
        and creates a client for comunicate with ONCAT
        '''
        self._storage = TokenStorage(request)
        if not self._storage.token:
            token = self._get_new_token()
            self._storage.token = token

    def _get_new_token(self):
        '''
        Get a new token
        '''
        logger.info("Getting a new token...")
        initial_oauth_client = requests_oauthlib.OAuth2Session(
            client=oauthlib.oauth2.LegacyApplicationClient(
                client_id=settings.ONCAT_CLIENT_ID,
                client_secret=settings.ONCAT_CLIENT_SECRET,
            )
        )
        token = initial_oauth_client.fetch_token(
            settings.ONCAT_TOKEN_URL,
            username=self._storage.username,
            password=self._storage.password,
            client_id=settings.ONCAT_CLIENT_ID,
            client_secret=settings.ONCAT_CLIENT_SECRET,
        )
        logger.debug("Got a new token: %s", token)
        return token

    def get_auto_refresh_client(self):
        '''

        '''
        client = requests_oauthlib.OAuth2Session(
            settings.ONCAT_CLIENT_ID,
            token=self._storage.token,
            auto_refresh_url=settings.ONCAT_TOKEN_URL,
            auto_refresh_kwargs={
                'client_id': settings.ONCAT_CLIENT_ID,
                'client_secret': settings.ONCAT_CLIENT_SECRET,
            },
            token_updater=self._storage.set_token,
        )
        return client


class RESTInterface(object):
    '''
    Generic class for REST comunication
    '''

    timeout = 20

    def __init__(self, url_prefix, request, headers={}, http_method='get'):
        '''
        @param http_method :: either get or post
        '''
        oauth = OAuthClient(request)
        client = oauth.get_auto_refresh_client()

        self._url_prefix = url_prefix
        self._headers = {"Accept": "application/json"}
        self._headers.update(headers)
        if http_method not in ['get', 'post']:
            raise ValueError("Invalid http method. Expected get or post.1")
        # this will create: requests.get or requests.post
        self._http_method_call = getattr(client, http_method)

    def __del__(self):
        '''
        Just makes sure the HTTP connection will be closed
        '''
        pass

    def _request(self, url_suffix="", params_json=None):
        try:
            request_str = self._url_prefix + url_suffix
            logger.debug("URL (%s): %s :: Params:\n%s",
                         self._http_method_call.__name__, request_str,
                         pformat(params_json))
            response = self._http_method_call(
                request_str,
                headers=self._headers,
                params=params_json,
                verify=False,
                timeout=self.timeout,
            )
            response.raise_for_status()
            logger.debug("ICat response status code: %s", response.status_code)
            # logger.debug("ICat response content:\n%s\n%s", pformat(response.json()), 80*"*")
            return response.json()
        except requests.exceptions.Timeout as this_exception:
            # Maybe set up for a retry, or continue in a retry loop
            logger.exception(this_exception)
        except requests.exceptions.TooManyRedirects as this_exception:
            # Tell the user their URL was bad and try a different one
            logger.exception(this_exception)
        except requests.exceptions.RequestException as this_exception:
            # catastrophic error. bail.
            logger.exception(this_exception)
        except requests.HTTPError as error:
            if(error.response.status_code == 401 and
                    'Bearer Token Not Found' in error.response.text):
                logger.exception(error)
        return None
