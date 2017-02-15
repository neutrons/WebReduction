'''
Created on Dec 8, 2015

@author: rhf
'''

import requests
import json
import logging

from pprint import pformat, pprint

from server.apps.catalog.icat.communication import ICat

logger = logging.getLogger(__name__)

class SNSICat(ICat):

    def __init__(self,):
        url_prefix = "http://icat.sns.gov:2080"
        super(SNSICat, self).__init__(url_prefix)

    def get_instruments(self):
        '''
        @return:
        {u'instrument': [u'ARCS',
                 u'BSS',
                 u'CNCS',
                 u'CORELLI',
                 u'EQSANS',
                 u'FNPB',
                 u'HYS',
                 u'HYSA',
                 u'MANDI',
                 u'NOM',
                 u'NSE',
                 u'PG3',
                 u'REF_L',
                 u'REF_M',
                 u'SEQ',
                 u'SNAP',
                 u'TOPAZ',
                 u'USANS',
                 u'VIS',
                 u'VULCAN']}
        '''
        logger.debug("get_instruments")
        return self._request("/icat-rest-ws/experiment/SNS")


    def get_experiments(self, instrument):
        '''
        @return:
        {'proposal': ['2010_2_6_SCI',
              '2013_2_6_CAL',
              'IPTS-10038',
              'IPTS-10043',
              'IPTS-9894',
              'IPTS-9964']}

        '''
        logger.debug("get_experiments")
        return self._request("/icat-rest-ws/experiment/SNS/" + instrument)

    def get_experiments_meta(self, instrument):
        '''
        @param instrument: Valid instrument as string
        @return:
            {u'proposal': [{u'@id': u'IPTS-2774',
                u'collection': u'12',
                u'createTime': u'2012-08-02T16:19:37.604-04:00',
                u'title': u'Junk run'},
               {u'@id': u'IPTS-2911',
                u'collection': u'0',
                u'createTime': u'2012-08-01T20:17:26.894-04:00',
                u'title': u'H2O%2DMCM%2D41%2C cooling%2C T%3D%7E230 K Ei%3D800 meV F1%40600 T0%40150'},
                (.......................)
               {u'@id': u'IPTS-14252',
                u'collection': u'0',
                u'createTime': u'2015-12-15T15:53:34.576-05:00',
                u'title': u'CaRuTiO; T=4K; Ei=120 meV; Fch1=300 Hz T0=90 Hz'}]}
        '''

        logger.debug("get_experiments_meta")
        return self._request("/icat-rest-ws/experiment/SNS/" + instrument + "/meta")

    def get_user_experiments(self, ucams_uid):
        '''
        @param ucams_uid: valid 3 characters ORNL ucams user uid
        @param instrument: Valid instrument as string
        @return:
        {
            "proposals": [
                {
                    "IPTS": 522
                },
                {
                    "IPTS": 1602
                },
                (.....................)
                {
                    "IPTS": 15834
                }
            ]
        }
        '''
        logger.debug("get_user_experiments")
        return self._request('/prpsl_ws/getProposalNumbersByUser/%s' % (ucams_uid))

    def get_run_ranges(self, instrument, experiment):
        '''
        @param instrument: Valid instrument as string
        @return:
        {u'runRange': u'40136-40174, 40211-40246, 42375-42403'}
        '''
        request_str = '/icat-rest-ws/experiment/SNS/%s/%s' % (
            instrument,
            experiment
        )
        return self._request(request_str)


    def get_run_ranges_meta(self, instrument, experiment):
        '''
        @param instrument: Valid instrument as string
        @return:
        {
            "proposal": {
                "@id": "IPTS-8776",
                "collection": "0",
                "createTime": "2014-08-22T17:27:17.588-04:00",
                "runRange": "990-1002, 1005-1006, 1008-1025, 1027-1040, 1091-1155, 1157-3859, 3894-3901, 4339-4354, 4356-4381, 4389-4391",
                "title": "Test Run-73. 1857"
            }
        }
        '''

        request_str = '/icat-rest-ws/experiment/SNS/%s/%s/meta' % (
            instrument,
            experiment
        )
        return self._request(request_str)

    def get_runs_all(self, instrument, experiment):
        '''
        @param instrument: Valid instrument as string
        @return:
        {u'proposal': {u'@id': u'IPTS-9868',
               u'createTime': u'2013-08-19T18:58:56.688-04:00',
               u'runs': {u'run': [{u'@id': u'40136',
                                   u'duration': u'636.419',
                                   u'endTime': u'2013-08-19T18:58:53.298-04:00',
                                   u'startTime': u'2013-08-19T18:48:16.879-04:00',
                                   u'totalCounts': u'1.9907726E7'},
                                  {u'@id': u'40137',
                                   u'duration': u'9409.68',
                                   u'endTime': u'2013-08-20T11:20:58.309-04:00',
                                   u'startTime': u'2013-08-20T08:44:08.632-04:00',
                                   u'totalCounts': u'16740.0'},
                                 (................................)
                                  {u'@id': u'42401',
                                   u'duration': u'3028.77',
                                   u'endTime': u'2013-09-30T23:12:06.482-04:00',
                                   u'protonCharge': u'4.00066404949e+12',
                                   u'startTime': u'2013-09-30T22:21:37.715-04:00',
                                   u'totalCounts': u'6920258.0'},
                                  {u'@id': u'42402',
                                   u'duration': u'3177.77',
                                   u'endTime': u'2013-10-01T00:17:07.565-04:00',
                                   u'protonCharge': u'3.02740097175e+12',
                                   u'startTime': u'2013-09-30T23:24:09.798-04:00',
                                   u'totalCounts': u'8093002.0'},
                                  {u'@id': u'42403',
                                   u'duration': u'34757.0',
                                   u'endTime': u'2013-10-01T10:07:16.126-04:00',
                                   u'startTime': u'2013-10-01T00:27:59.082-04:00',
                                   u'totalCounts': u'129560.0'}]},
               u'title': u'Vanadium 5x5 White beam><E=110meV, T0=150Hz, Att1\n slitPacks: FC1=SEQ-700-3.5-AST FC2=SEQ-100-2.0-AST'}}
        '''

        request_str = '/icat-rest-ws/experiment/SNS/%s/%s/all' % (
            instrument,
            experiment
        )
        return self._request(request_str)

    def get_run_info(self, instrument, run_number):
        '''
        @param instrument: Valid instrument as string
        @return:
        {u'complete': u'false',
         u'duration': u'3028.77',
         u'endTime': u'2013-09-30T23:12:06.482-04:00',
         u'locations': {u'location': [u'/SNS/SEQ/IPTS-9868/shared/autoreduce/reduction_log/SEQ_42401.nxs.h5.log',
                                      u'/SNS/SEQ/IPTS-9868/shared/autoreduce/SEQ_42401_autoreduced.nxspe',
                                      u'/SNS/SEQ/IPTS-9868/shared/autoreduce/SEQ_42401_autoreduced.nxs',
                                      u'/SNS/SEQ/IPTS-9868/nexus/SEQ_42401.nxs.h5',
                                      u'/SNS/SEQ/IPTS-9868/adara/SEQ_42401.adara']},
         u'proposal': u'IPTS-9868',
         u'protonCharge': u'4.00066404949e+12',
         u'startTime': u'2013-09-30T22:21:37.715-04:00',
         u'totalCounts': u'6920258.0'}
        '''
        request_str = '/icat-rest-ws/dataset/SNS/%s/%s' % (
            instrument,
            run_number
        )

        return self._request(request_str)

    def get_run_info_meta_only(self, instrument, run_number):
        '''
        @param instrument: Valid instrument as string
        @return:
        {u'complete': u'false',
         u'duration': u'3028.77',
         u'endTime': u'2013-09-30T23:12:06.482-04:00',
         u'proposal': u'IPTS-9868',
         u'protonCharge': u'4.00066404949e+12',
         u'startTime': u'2013-09-30T22:21:37.715-04:00',
         u'totalCounts': u'6920258.0'}
        '''
        request_str = '/icat-rest-ws/dataset/SNS/%s/%s/metaOnly' % (
            instrument,
            run_number
        )
        return self._request(request_str)
 
    def get_run_info_lite(self, instrument, run_number):
        '''
        @param instrument: Valid instrument as string
        @return:
        {u'complete': u'false',
         u'duration': u'3028.77',
         u'endTime': u'2013-09-30T23:12:06.482-04:00',
         u'locations': {u'location': [u'/SNS/SEQ/IPTS-9868/adara/SEQ_42401.adara',
                                      u'/SNS/SEQ/IPTS-9868/nexus/SEQ_42401.nxs.h5',
                                      u'/SNS/SEQ/IPTS-9868/shared/autoreduce/reduction_log/SEQ_42401.nxs.h5.log',
                                      u'/SNS/SEQ/IPTS-9868/shared/autoreduce/SEQ_42401_autoreduced.nxs',
                                      u'/SNS/SEQ/IPTS-9868/shared/autoreduce/SEQ_42401_autoreduced.nxspe']},
         u'proposal': u'IPTS-9868',
         u'protonCharge': u'4.00066404949e+12',
         u'startTime': u'2013-09-30T22:21:37.715-04:00',
         u'totalCounts': u'6920258.0'}
        '''

        request_str = '/icat-rest-ws/dataset/SNS/%s/%s/lite' % (
            instrument,
            run_number
        )
        return self._request(request_str)

    def get_last_run(self, instrument):
        '''
        Gets the last run mumber for a certain instrument
        @param instrument: Valid instrument as string
        @return:
        {u'number': u'13780'}
        '''
        request_str = '/icat-rest-ws/datafile/SNS/%s' % (instrument)
        return self._request(request_str)

    def get_run_files(self, instrument, run_number):
        '''
        @param instrument: Valid instrument as string
        @return:
        {u'location': [u'/SNS/SEQ/IPTS-9868/adara/SEQ_42401.adara',
               u'/SNS/SEQ/IPTS-9868/nexus/SEQ_42401.nxs.h5',
               u'/SNS/SEQ/IPTS-9868/shared/autoreduce/reduction_log/SEQ_42401.nxs.h5.log',
               u'/SNS/SEQ/IPTS-9868/shared/autoreduce/SEQ_42401_autoreduced.nxs',
               u'/SNS/SEQ/IPTS-9868/shared/autoreduce/SEQ_42401_autoreduced.nxspe']}
        '''
        request_str = '/icat-rest-ws/datafile/SNS/%s/%s' % (
            instrument,
            run_number
        )
        return self._request(request_str)


# Main just for testing
if __name__ == "__main__":

    icat = SNSICat()
#     pprint(icat.get_instruments())
    pprint(icat.get_experiments("EQSANS"))
#     pprint(icat.get_experiments_meta("EQSANS"))
#     pprint(icat.get_user_experiments("m2d"))
#     pprint(icat.get_run_ranges("EQSANS","IPTS-16890"))
#     pprint(icat.get_run_ranges_meta("EQSANS","IPTS-16890"))
#     pprint(icat.get_runs_all("EQSANS","IPTS-16890"))
#     pprint(icat.get_run_info("EQSANS", "74872")) # HEAVY
#     pprint(icat.get_run_info_meta_only("EQSANS", "74872"))
#     pprint(icat.get_run_info_lite("EQSANS", "74872"))
#     pprint(icat.get_last_run("EQSANS"))
#     pprint(icat.get_run_files("EQSANS", "74872"))
    
