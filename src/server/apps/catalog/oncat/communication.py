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

TOKEN = settings.ONCAT_TOKEN


class ONCat(RESTInterface):
    '''
    Base class for the ONCat requests
    It shouldn't be instantiated
    '''
    def __init__(self):
        super().__init__(
            url_prefix=settings.ONCAT_URL,
            headers={
                'Authorization': 'Bearer {}'.format(TOKEN)
            },
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
            'projection': ['tags', 'name', 'title', 'exts', 'size'],
        }
        return self._request("/experiments", params_json)

    def runs(self, params_json):
        '''

        '''
        # logger.debug("func runs:\n%s", pformat(params_json))
        return self._request("/datafiles", params_json=params_json)

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

    def __init__(self):
        super().__init__()
        self.facility = 'HFIR'

    def experiments(self, instrument):
        '''
        @return:
          [{'id': 'IPTS-18141',
            'name': 'IPTS-18141',
            'tags': ['spice/exp437', 'type/raw'],
            'type': 'experiment'},
            {'id': 'IPTS-18155',
            'name': 'IPTS-18155',
            'tags': ['spice/exp401',
                    'spice/exp405',
                    'spice/exp410',
                    'spice/exp429',
                    'spice/exp438',
                    'type/raw'],
            'type': 'experiment'}, ... ]
        '''
        return super().experiments(self.facility, instrument)

    def runs(self, instrument, ipts, exp, extensions=['.xml', '.dat']):
        '''
        @param ipts : IPTS-17471
        @param exp : exp371

         [{'ext': None,
                'location': '/HFIR/CG3/IPTS-18265/exp359/Datafiles/BioSANS_exp359_scan0014_0001.xml',
                'metadata': {'spicerack': {'@end_time': '2016-11-18 11:01:07',
                                            'header': {'scan_title': 'Rich_Glu(IC: '
                                                                    'SVP_6A_SDD15.5m_Banjo '
                                                                    'S: 0.003-0.8 P:[ '
                                                                    'Chiller Temp (C): '
                                                                    '20.000000])'}}},
                'tags': None,
                'thumbnails': {'Detector':  ...
                               'DetectorWing': ....
                               }
        '''
        for extension in extensions:
            params_json = {
                'facility': self.facility,
                'instrument': instrument,
                'experiment': ipts,
                'tags': ['spice/{}'.format(exp)],
                'ext': extension,
                'projection': [
                    'location',
                    'metadata.spicerack.@filename',
                    'metadata.spicerack.@end_time',
                    'metadata.spicerack.header',
                    'metadata.spicerack.sample_info',
                    'thumbnails',
                    'metadata.spicerack.motor_positions',
                ],
            }
            result = super().runs(params_json)
            if len(result) > 0:
                return result
        return []

    def run(self, instrument, ipts, file_location):
        '''

        {'ext': 'xml',
 'location': '/HFIR/CG3/IPTS-18265/exp359/Datafiles/BioSANS_exp359_scan0014_0001.xml',
 'metadata': {'spicerack': {'@end_time': '2016-11-18 11:01:07',
                            '@filename': 'BioSANS_exp359_scan0014_0001.xml',
                            '@spice_version': '1.7',
                        'parameter_positions': {'chillerp': 20.0,
                                                    'tumbler1': 0.0},
                            'sample_info': {'background': {'field': {'Cell Thickness (mm) (mm)': '1',
                                                                     'background': 'Empty '
                                                                                   'Banjo'}},
                                            'parameters': {'field': {'Chiller Temp (C)': '20.000000'}},
                                            'sample': {'field': {'content': 'ground'}}}}},

        '''
        return super().run(self.facility, instrument, ipts, file_location)


class SNS(ONCat):

    def __init__(self):
        super().__init__()
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
        for extension in extensions:
            params_json = {
                'facility': self.facility,
                'instrument': instrument,
                'experiment': ipts,
                'ext': extension,
                'projection': [
                    'location',
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
            }
            result = super().runs(params_json)
            if result is not None and len(result) > 0:
                return result
        return []
    
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
