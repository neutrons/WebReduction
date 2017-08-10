import json
import logging
from pprint import pformat, pprint

import requests

logger = logging.getLogger(__name__)

"""

ICAT Json interface

This just communicate with ICAT

Do not implement here any filtering to the output json!!!

"""


class ICat(object):
    '''
    ICAT generic communication
    '''

    timeout = 5

    def __init__(self, url_prefix, headers={}, http_method='get'):
        '''
        @param http_method :: either get or post
        '''
        self._url_prefix = url_prefix
        self._headers = {"Accept": "application/json"}
        self._headers.update(headers)
        if http_method not in ['get', 'post']:
            raise ValueError("Invalid http method. Expected get or post.1")
        # this will create: requests.get or requests.post
        self._http_method_call = getattr(requests, http_method)

    def __del__(self):
        '''
        Just makes sure the HTTP connection will be closed
        '''
        pass

    def _request(self, url_suffix="", params_json=None):
        try:
            request_str = self._url_prefix + url_suffix
            logger.debug("ICat url (%s): %s",
                         self._http_method_call.__name__, request_str)
            response = self._http_method_call(
                request_str,
                headers=self._headers,
                params=params_json,
                verify=False,
                timeout=self.timeout
            )
            response.raise_for_status()
            logger.debug("ICat response status code: %s", response.status_code)
            logger.debug("ICat response content: %s", response.json())
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
        return None
