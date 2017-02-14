#from .communication import HFIRICat
from server.apps.catalog.icat.hfir.communication import HFIRICat

import json
import logging

from django.utils import dateparse
from pprint import pformat, pprint


logger = logging.getLogger('catalog.icat.hfir')

class Catalog(object):
    '''
    Custom functionality to ICAT!
    '''
    def __init__(self):
        '''
        '''
        self.icat = HFIRICat()


    def get_experiments(self, instrument):
        '''
        [
            'ipts': 'IPTS-0000',
            'exp': [
                'exp320',
                'exp305'
            ]

        ]

        '''
        response = self.icat.get_experiments(instrument)
        result = None
        if response is not None:
            result = [{'ipts': entry['name'],
                       'exp' : sorted([
                           tag.split('/')[1]
                           for tag in entry['tags'] ])}
                      for entry in  response]
        return result



if __name__ == "__main__":
    icat = Catalog()
    res = icat.get_experiments("CG3")
    pprint(res)