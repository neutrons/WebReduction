#!/usr/bin/env python

import json
import requests

from pprint import pprint

import logging
logger = logging.getLogger('catalog.icat.hfir')


# Suppress warning about certs for now.  We'd obviously have to get this
# set up properly before we ever started passing LDAP credentials
# around...
from requests.packages.urllib3.exceptions import InsecureRequestWarning
requests.packages.urllib3.disable_warnings(InsecureRequestWarning)

# The testing ICAT instance is the one to use for now.
HFIR_ICAT_URL = 'https://hfir-icat-testing.ornl.gov'


class HFIR(object):
    def __init__(self, url_prefix=HFIR_ICAT_URL):
        self.url_prefix = url_prefix
        self.session = {}

    def _set_session(self, session_id):
        self.session = {'session_id': session_id}

    def login(self, username = 'simple/sis_automated_test_user',
            password = 'test_account_cred_sis'):
        logger.debug("Logging user: %s", username)
        response = requests.post(
            self.url_prefix + '/login',
            headers = {
                'username': username,
                'password': password
            },
            # We haven't set up certs properly yet.
            verify = False
        )
        response.raise_for_status()
        session_id = response.json()['session_id']
        self._set_session(session_id)
        return session_id

    def list_ipts(self, instrument):
        '''
        [{'Experiment': {'name': 'IPTS-17845'}},
        {'Experiment': {'name': 'IPTS-17092'}},
        (.......)
        {'Experiment': {'name': 'IPTS-15932'}}]
        '''
        logger.debug("Listting IPTS for %s.",instrument)

        response = requests.get(
            self.url_prefix + '/facilities/HFIR/instruments/%s/experiments'%instrument,
            headers = self.session,
            verify = False
        )
        response.raise_for_status()
        return response.json()

    def get_metadata(self, instrument, ipts, exp, scan, frame):
        '''
        ips = IPTS-17845
        exp = exp161

        '''
        response = requests.get(
            str(self.url_prefix + \
            '/facilities/HFIR/instruments/{0}/experiments/{1}' + \
            '/datasets/{2}_scan{3}/datafiles/{0}_{2}_scan{3:04}_{4:04}.xml' + \
            '/metadata').format(instrument,ipts,exp,scan,frame),
            headers = self.session,
            verify = False
        )
        response.raise_for_status()
        return response.json()


# Main just for testing
if __name__ == "__main__":
    logger.setLevel(logging.DEBUG)
    icat = HFIR()
    session_id = icat.login()
    print(icat.session)
    print(80*"*")
    pprint(icat.list_ipts("CG2"))
    print(80*"*")
    pprint(icat.get_metadata("CG2","IPTS-17845", "exp161", 1, 1),width=200)