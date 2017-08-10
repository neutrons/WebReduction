import logging
import re
from pprint import pformat, pprint
from collections import OrderedDict
from django.utils import dateparse

from .communication import HFIRICat
from .util import Parser

logger = logging.getLogger(__name__)


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
        [{'exp': ['exp305',
                'exp320',
                'exp327',
                'exp338',
                'exp357',
                'exp367',
                'exp368',
                'exp369',
                'exp380'],
        'ipts': 'IPTS-0000'},

        '''
        response = self.icat.get_experiments(instrument)
        result = None
        if response is not None:
            try:
                result = [{
                    'ipts': entry['name'],
                    'exp': sorted([
                        tag.split('/')[1] for tag in entry['tags']])}
                          for entry in response]
            except KeyError as this_exception:
                logger.exception(this_exception)
            except IndexError as this_exception:
                logger.exception(this_exception)
        
        # logger.debug(pformat(result))
        return result

    def get_runs(self, instrument, ipts, exp):
        '''
        return a list of:
        {'end_time': '2017-02-06 10:03:18',
        'filename': 'BioSANS_exp379_scan0500_0001.xml',
        'location': '/HFIR/CG3/IPTS-18347/exp379/Datafiles/BioSANS_exp379_scan0500_0001.xml',
        'sample_background': {'buffer D2O': '35'},
        'sample_info': {'Sample type': 'd25'},
        'sample_parameters': {'Chiller Temp (C)': '20.000000',
                                'Min Wait (sec)': '1.000000'},
        'title': 'DAS Test 6(IC: DAS_test_SVP_p0015top8_Banjo S: 0.003-0.8 P:[ '
                'Chiller Temp (C): 20.000000 Min Wait (sec): 1.000000])'}]

        '''
        response = self.icat.get_runs(instrument, ipts, exp)
        # logger.debug("Response for %s %s %s: %s", instrument, ipts, exp, pformat(response))
        result = None
        if response is not None:
            try:
                # pprint(response)
                result = [dict(
                    {
                        # subset
                        k: entry[k] for k in ('location', 'thumbnails')
                    }, **{
                        # Metadata here:
                        'filename': entry['metadata']['spicerack']['@filename'],
                        'end_time':  entry['metadata']['spicerack']['@end_time'],
                        'title': entry['metadata']['spicerack']['header']['scan_title'],
                        'sample_info': entry['metadata']['spicerack']['sample_info']['sample']['field']
                                       if entry['metadata']['spicerack']['sample_info']['sample'] else "",
                        'sample_background': entry['metadata']['spicerack']['sample_info']['background']['field']
                                             if entry['metadata']['spicerack']['sample_info']['background'] else "",
                        'sample_parameters': entry['metadata']['spicerack']['sample_info']['parameters']['field']
                                             if entry['metadata']['spicerack']['sample_info']['parameters'] else "",
                        # This gets rid of None values in the metadata
                        'metadata': {(key): (value if value is not None else "") for key, value in
                                     entry['metadata']['spicerack']['header'].items()},
                        'motor_positions': {(key): (value if value is not None else "") for key, value in
                                     entry['metadata']['spicerack']['motor_positions'].items()}
                    })
                          for entry in response  # if entry['ext'] == 'xml'
                         ]
            except KeyError as this_exception:
                logger.exception(this_exception)
            except IndexError as this_exception:
                logger.exception(this_exception)
        return result


    def _parse_filename(self, filename):
        '''
        filename of the form
        BioSANS_exp379_scan0500_0001.xml'
        return: instrument, exp number, scan number, frame number
        '''
        regex = r"(\w+)_exp(\d+)_scan(\d+)_(\d+)\.xml"
        match = re.search(regex, filename)
        if match:
            return match.group(1), int(match.group(2)), int(match.group(3)), int(match.group(4))
        else:
            return None


    def get_runs_as_table(self, instrument, ipts, exp):
        '''
        Same as get runs but split sample_* in tables
        Returns 2 lists:
        - headers
        - list of rows
        '''

        # Let's make a rubset first
        data = self.get_runs(instrument, ipts, exp)
        subset = []
        for d in data:
            entry = OrderedDict()
            entry["Title"] = d["metadata"]["scan_title"]
            _, _, scan_number, frame_number = self._parse_filename(d["filename"])
            entry["Scan Nr"] = scan_number
            entry["Frame Nr"] = frame_number
            entry["Scan Type"] = d["metadata"]["scan_type"]
            entry["Sample Type"] = d["metadata"]["sample_type"]
            entry["Wavelength"] = d["metadata"]["wavelength"]
            entry["Sample Apert."] = d["metadata"]["sample_aperture_size"]
            entry["SDD"] = d["motor_positions"]["sdd"]
            entry["SSD"] = d["metadata"]["source_distance"]
            entry["End"] = d["end_time"]
            entry["Thickness"] = d["metadata"]["sample_thickness"]
            entry["Sample"] = d["sample_info"] if d["sample_info"] != "" else None
            entry["Background"] = d["sample_background"] if d["sample_background"] != "" else None
            entry["Parameters"] = d["sample_parameters"] if d["sample_parameters"] != "" else None
            subset.append(entry)

        # transform k,v where v is a dict in new key composed by k + k of the
        # second dictionary
        subset2 = []
        for d in subset:
            d2 = d.copy()
            for k, v in d.items():
                if v is None:
                    d2.pop(k)
                    continue
                if type(v) == dict:
                    for k2, v2 in v.items():
                        if v2 is not None and v2 != "":
                            d2[k + " " + k2] = v2
                        d2.pop(k, None)
            subset2.append(d2)

        # Get  all entries in the dict with common keys
        # all_keys = set([k for d in subset2 for k in d.keys()])
        # dict with all common keys set to none
        empty = OrderedDict({})
        for d in subset2:
            for k in d.keys():
                empty[k] = "None"

        subset3 = []
        for d in subset2:
            empty2 = empty.copy()
            empty2.update(d)
            subset3.append(empty2)

        # logger.debug(pformat(subset3))
        return list(empty.keys()), [list(d.values()) for d in subset3]


    def _get_data(self, filename):
        '''
        Only for HFIR we need to have the real detector XML paths
       @returns:
        {'data': [{'Detector': array([[0, 0, 0, ..., 0, 0, 0],
       [0, 0, 0, ..., 0, 0, 0],
       [0, 0, 0, ..., 0, 0, 0],
       ..., 
       [0, 0, 0, ..., 0, 0, 0],
       [0, 0, 0, ..., 0, 0, 0],
       [0, 0, 0, ..., 0, 0, 0]])},
          {'DetectorWing': array([[0, 0, 0, ..., 0, 0, 0],
       [0, 0, 0, ..., 0, 0, 0],
       [0, 0, 0, ..., 0, 0, 0],
       ..., 
       [0, 0, 0, ..., 0, 0, 0],
       [0, 0, 0, ..., 0, 0, 0],
       [0, 0, 0, ..., 0, 0, 0]])}]

        '''
        res = {}
        logger.debug("Parsing: {}.".format(filename))
        p = Parser(filename)
        if p.is_valid():
            data_main_detector = p.getData("Data/Detector")
            data_wing_detector = p.getData("Data/DetectorWing")
            res['Detector'] = data_main_detector.tolist()
            if data_wing_detector is not None:
                res['DetectorWing'] = data_wing_detector.tolist()
        return res


    def run_info(self, instrument, ipts, file_location):
        '''

        '''

        response = self.icat.run_info(instrument, ipts, file_location)
        result = None
        if response is not None:
            try:
                entry = response
                result = dict(
                    {
                        # subset
                        k: entry[k] for k in ('location', 'thumbnails')
                    }, **{
                        # Metadata here:
                        'filename': entry['metadata']['spicerack']['@filename'],
                        'metadata': entry['metadata']['spicerack']['header'],
                        'sample_info': entry['metadata']['spicerack']['sample_info'],
                    })
            except KeyError as this_exception:
                logger.exception(this_exception)
            except IndexError as this_exception:
                logger.exception(this_exception)
        return result

    def get_run(self, instrument, ipts, file_location):
        '''
        Gets run_info and adds the data
        '''
        run_info = self.run_info(instrument, ipts, file_location)
        run_info.pop('thumbnails', None) # remove the thumbnails
        run_info['data'] = self._get_data(file_location)
        return run_info



if __name__ == "__main__":
    icat = Catalog()
    # res = icat.get_experiments("CG3")
    # pprint(res)
    res = icat.get_runs("CG3", 'IPTS-18347','exp379')
    # pprint(res)
    #res = icat.get_run(
    #    "CG3", 'IPTS-18289', '/HFIR/CG3/IPTS-18289/exp400/Datafiles/BioSANS_exp400_scan0001_0001.xml')
    # res.pop('data')
    #res = icat.get_runs("CG3", "IPTS-18512", "exp394")
    #res = icat._parse_filename('BioSANS_exp379_scan0500_0001.xml')

    pprint(res)
