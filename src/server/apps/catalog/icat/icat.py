import requests
import json
import logging

from pprint import pformat, pprint

logger = logging.getLogger(__name__)

"""

ICAT Json interface

This just communicate with ICAT

Do not implement here any filtering to the output json!!!

"""


class ICat(object):
    '''
    ICAT rest interface
    '''
    def __init__(self, url_prefix, headers = {}):
        self._url_prefix = url_prefix
        self._headers = {"Accept": "application/json"}
        self._headers.update(headers)


    def __del__(self):
        '''
        Just makes sure the HTTP connection will be closed
        '''
        pass

    def _request(self, url_suffix="", params_json = None):
        try:
            request_str = self._url_prefix + url_suffix
            response = requests.get(
                request_str,
                headers= self._headers,
                json = params_json,
                verify = False,
                )
            response.raise_for_status()
            return response.json()
        except Exception as e:
            logger.exception(e)
            return None