import logging
from pprint import pformat

from ..communication import ICat

logger = logging.getLogger(__name__)

SANS_TOKEN = \
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ0b3B0YWwuY29tIiw' \
    'iZXhwIjoxNDI2NDIwODAwLCJodHRwOi8vdG9wdGFsLmNvbS9qd3RfY2xhaW1zL2l' \
    'zX2FkbWluIjp0cnVlLCJjb21wYW55IjoiVG9wdGFsIiwiYXdlc29tZSI6dHJ1ZX0' \
    '.yRQYnWzskCZUxPwaQupWkiUzKELZ49eM7oWxAQK_ZXw'


class HFIRICat(ICat):

    def __init__(self):
        super(HFIRICat, self).__init__(
            url_prefix='https://hfir-icat.ornl.gov/api',
            headers={
                'Authorization': 'Bearer {}'.format(SANS_TOKEN)
            },
            http_method='get',
        )

    def get_experiments(self, instrument):
        '''
        Returns:
            {'exts': None,
            'name': 'IPTS-17241',
            'tags': ['spice/exp337',
                    'spice/exp339',
                    'spice/exp343',
                    'spice/exp348',
                    'spice/exp358',
                    'spice/exp367',
                    'spice/exp381']},
            {'exts': None, 'name': 'IPTS-17252', 'tags': ['spice/exp321']},
        '''
        logger.debug("get_experiments")
        return self._request("/facilities/HFIR/instruments/{}/experiments".format(instrument),
                             params_json={'projection': ['tags']})

    def get_runs(self, instrument, ipts, exp):
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
        logger.debug("get_runs for %s %s %s", instrument, ipts, exp)
        json_params = {
            'tags': ['spice/{}'.format(exp)],
            'ext': 'xml',
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
        return self._request("/facilities/HFIR/instruments/{}/experiments/{}/datafiles".format(
            instrument, ipts),
            params_json=json_params,
        )

    def run_info(self, instrument, ipts, file_location):
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
        logger.debug("get_experiments")
        return self._request("/facilities/HFIR/instruments/{}/experiments/{}/datafiles{}".format(
            instrument,
            ipts,
            file_location
        ),
        )


if __name__ == "__main__":
    icat = HFIRICat()
    res = icat.get_experiments("CG3")
    pprint(res)
    res = icat.get_runs("CG3", "IPTS-18265", "exp359")
    pprint(res)
    res = icat.run_info(
        "CG3", "IPTS-18265", "/HFIR/CG3/IPTS-18265/exp359/Datafiles/BioSANS_exp359_scan0014_0001.xml")
    pprint(res)
