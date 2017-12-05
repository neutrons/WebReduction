import logging
from pprint import pformat, pprint
from django.conf import settings
from .rest import RESTInterface

'''

This file only ommunicates with the oncat.
The data is return RAW from ONCat

The PAI documentation is here:
https://oncat.ornl.gov/doc

For future see this:
http://requests-oauthlib.readthedocs.io/en/latest/oauth2_workflow.html#legacy-application-flow

'''
logger = logging.getLogger(__name__)


class ONCat(RESTInterface):
    '''
    Base class for the ONCat requests
    It shouldn't be instantiated
    '''
    def __init__(self, request):
        super().__init__(
            url_prefix=settings.ONCAT_URL,
            request=request,
            http_method='get',
        )

    def experiments(self, facility, instrument):
        '''
        '''
        logger.debug("func experiments for %s and %s.",
                     facility, instrument)
        params_json = {
            'facility': facility,
            'instrument': instrument,
            'projection': ['tags', 'name', 'title', 'exts',
                           'size', 'latest', 'users'],
        }
        return self._request("/experiments", params_json)

    def runs(self, params_json):
        '''

        '''
        # logger.debug("func runs:\n%s", pformat(params_json))
        result = self._request("/datafiles", params_json=params_json)
        if result is not None and len(result) > 0:
            return result
        else:
            return []

    def run(self, facility, instrument, ipts, file_location):
        '''
        '''
        logger.debug("func runs for %s %s and %s: %s",
                     facility, instrument, ipts, file_location)

        params_json = {
            'facility': facility,
            'instrument': instrument,
            'experiment': ipts,
        }
        return self._request("/datafiles{}".format(file_location),
                             params_json=params_json)


class HFIR(ONCat):

    # different instruments have different file types (TAS has .dat)
    RUNS_EXTENSIONS = {
        'DEFAULT': ['.xml'],
        'CG4C': ['.dat'],
        'HB1': ['.dat'],
        'HB1A': ['.dat'],
        'HB3': ['.dat'],
    }

    RUNS_PROJECTIONS = {
        'DEFAULT': [],  # all fields
        'CG2': [
            'location',
            'modified',
            'metadata.spicerack.@filename',
            'metadata.spicerack.@end_time',
            'metadata.spicerack.header',
            'metadata.spicerack.sample_info',
            'thumbnails',
            'metadata.spicerack.motor_positions',
        ],
        'CG3': [
            'location',
            'modified',
            'metadata.spicerack.@filename',
            'metadata.spicerack.@end_time',
            'metadata.spicerack.header',
            'metadata.spicerack.sample_info',
            'thumbnails',
            'metadata.spicerack.motor_positions',
        ]
    }

    def __init__(self, request):
        super().__init__(request)
        self.facility = 'HFIR'

    def experiments(self, instrument):
        return super().experiments(self.facility, instrument)

    def runs(self, instrument, ipts, exp):
        
        extensions = self.RUNS_EXTENSIONS.get(
            instrument, self.RUNS_EXTENSIONS['DEFAULT'])

        params_json = {
            'facility': self.facility,
            'instrument': instrument,
            'experiment': ipts,
            'tags': ['spice/{}'.format(exp)],
            'exts': extensions,
            'projection': self.RUNS_PROJECTIONS.get(
                instrument, self.RUNS_PROJECTIONS['DEFAULT'])
        }
        return super().runs(params_json)

    def run(self, instrument, ipts, file_location):
        return super().run(self.facility, instrument, ipts, file_location)


class SNS(ONCat):

    # Projection for RUNS. Define here the projection for SNS instruments.
    # Otherwise default is used
    RUNS_PROJECTIONS = {
        'DEFAULT': [
            'location',
            'modified',
            'metadata.entry.run_number',
            'metadata.entry.title',
            'metadata.entry.start_time',
            'metadata.entry.end_time',
            'metadata.entry.duration',
            'metadata.entry.total_counts',
        ],
        'EQSANS': [
            'location',
            'modified',
            'metadata.entry.run_number',
            'metadata.entry.title',
            'metadata.entry.start_time',
            'metadata.entry.end_time',
            'metadata.entry.duration',
            'metadata.entry.total_counts',
            'metadata.entry.daslogs.detectorz.average_value',
            'metadata.entry.daslogs.lambdarequest.average_value',
            'metadata.entry.daslogs.frequency.average_value',
            'metadata.entry.daslogs.speed1.average_value',
        ],
        'REF_M': [
            'location',
            'modified',
            'metadata.entry-off_off.run_number',
            'metadata.entry-off_off.title',
            'metadata.entry-off_off.start_time',
            'metadata.entry-off_off.end_time',
            'metadata.entry-off_off.duration',
            'metadata.entry-off_off.total_counts',
        ]
    }


    def __init__(self, request):
        super().__init__(request)
        self.facility = 'SNS'

    def experiments(self, instrument):
        '''
        @return:
            [{'id': 'IPTS-18268',
              'name': 'IPTS-18268',
              'tags': ['type/raw'],
              'type': 'experiment'}, ... ]
        '''
        return super().experiments(self.facility, instrument)

    def runs(self, instrument, ipts, extensions=['.nxs', '.nxs.h5']):
        '''

        '''
        params_json = {
            'facility': self.facility,
            'instrument': instrument,
            'experiment': ipts,
            'exts': extensions,
            'projection': self.RUNS_PROJECTIONS.get(
                instrument, self.RUNS_PROJECTIONS['DEFAULT'])
        }
        return super().runs(params_json)
    
    def run(self, instrument, ipts, file_location):
        '''
        '''
        return super().run(self.facility, instrument, ipts, file_location)


if __name__ == "__main__":
    
    from http.client import HTTPConnection
    HTTPConnection.debuglevel = 1

    logging.basicConfig() # you need to initialize logging, otherwise you will not see anything from requests
    logging.getLogger().setLevel(logging.DEBUG)
    requests_log = logging.getLogger("requests.packages.urllib3")
    requests_log.setLevel(logging.DEBUG)
    requests_log.propagate = True

    # ## HFIR
    # oncat = HFIR()
    # res = oncat.experiments("CG3")
    # res = oncat.runs("CG3", ipts='IPTS-19469', exp='exp406')
    # res = oncat.run("CG3", 'IPTS-19469', '/HFIR/CG3/IPTS-19469/exp406/Datafiles/BioSANS_exp406_scan0016_0001.xml')
    

    ## SNS
    oncat = SNS()
    # res = oncat.experiments("EQSANS")
    res = oncat.runs("EQSANS", 'IPTS-19298')
    # res = oncat.run("EQSANS", 'IPTS-19298', '/SNS/EQSANS/IPTS-19298/nexus/EQSANS_87594.nxs.h5')

    print("\n"+80*"*")
    pprint(res)
