import os
import logging
import re
import json

from abc import ABC, abstractmethod
from collections import OrderedDict
from pprint import pformat, pprint

from django.utils import dateparse

from .communication import HFIR as HFIRCom
from .communication import SNS as SNSCom
from .hfir.util import Parser

logger = logging.getLogger(__name__)


class Catalog(ABC):
    '''
    Abstract class for both HFIR and SNS catalog.
    The main methods to be defined in the subclasses are here.
    '''

    def __new__(cls, facility, *args, **kwargs):
        '''
        This allows to great subclasses from this base class,
        given a facility name

        The Catalog should be constructed like this:
        cat = Catalog(Facility)
        Where facility is the name of the classes below
        '''
        for subclass in Catalog.__subclasses__():
            if str(subclass.__name__) == facility:
                return super(cls, subclass).__new__(subclass)
        raise Exception('Facility not supported!')

    @abstractmethod
    def experiments(self, instrument):
        pass

    @abstractmethod
    def runs(self, instrument, ipts, *args, **kwargs):
        pass

    @abstractmethod
    def run(self, instrument, ipts, *args, **kwargs):
        pass


class SNS(Catalog):
    '''
    '''
    # Some of the NeXus files don't have an entry as first group

    RUNS_ENTRY_KEYWORD = {
        'DEFAULT': 'entry',
        'REF_M': 'entry-off_off',
    }

    @staticmethod
    def _runs_eqsans(entry_name, entry):
        elem = {}
        try:
            # frame_skipping=speed1 - frequency / 2.0) < 1.0
            elem['is_frame_skipping'] = entry['metadata'][entry_name]['daslogs']['speed1']['average_value'] \
                - entry['metadata'][entry_name]['daslogs']['frequency']['average_value'] / 2.0 < 1.0
        except KeyError:
            elem['is_frame_skipping'] = ""
        return elem

    RUNS_PARSE_FUNCS = {
        'DEFAULT': 'entry',
        'EQSANS': _runs_eqsans,
    }

    def __init__(self, facility, request):
        '''
        '''
        self.catalog = SNSCom(request)

    def experiments(self, instrument):
        '''
        @return: [...
            {'ipts': 'IPTS-19574'},
            {'ipts': 'IPTS-19658'},
            {'ipts': 'IPTS-19717'}]

        '''
        response = self.catalog.experiments(instrument)
        result = []
        if response is not None:
            try:
                for entry in response:
                    entry['ipts'] = entry.pop('name')
                    entry['date'] = dateparse.parse_datetime(entry['latest']['created'])
                    result.append(entry)
            except KeyError as this_exception:
                logger.exception(this_exception)
            except IndexError as this_exception:
                logger.exception(this_exception)

        # logger.debug(pformat(result))
        return result



    def runs(self, instrument, ipts, *args, **kwargs):
        '''


        '''
        response = self.catalog.runs(instrument, ipts)
        # logger.debug("Raw Response from Communication: %s:\n%s", instrument, pformat(response))
        result = []
        entry_name = self.RUNS_ENTRY_KEYWORD.get(
            instrument,  self.RUNS_ENTRY_KEYWORD['DEFAULT'])
        if response is not None:
            for entry in response:
                elem = {}
                elem['location'] = entry['location']
                elem['modified'] = dateparse.parse_datetime(entry['modified'])
                elem['metadata'] = {
                    (key): (value if value is not None else "") for key, value in entry['metadata'][entry_name].items()
                }
                elem['title'] = elem['metadata']['title']
                specific_func = self.RUNS_PARSE_FUNCS.get(instrument)
                if specific_func:
                    elem.update(specific_func.__func__(entry_name, entry))
                result.append(elem)


        # logger.debug("Response sent to view for Get Run %s:\n%s", instrument, pformat(result))
        return result

    def run(self, instrument, ipts, file_location):
        '''

        '''
        response = self.catalog.run(instrument, ipts, file_location)

        entry_name = self.RUNS_ENTRY_KEYWORD.get(
            instrument,  self.RUNS_ENTRY_KEYWORD['DEFAULT'])
        result = None

        logger.debug("Getting run details for %s %s -> %s", instrument, ipts, file_location)
        logger.debug(entry_name)
        if response is not None:
            try:
                entry = response
                result = dict(
                    {
                        # subset
                        k: entry[k] for k in ('location',)

                    }, **{
                        'metadata': entry['metadata'][entry_name],
                    })
            except KeyError as this_exception:
                logger.exception(this_exception)
            except IndexError as this_exception:
                logger.exception(this_exception)
        # This solves de None / NaN conversion
        return result


class HFIR(Catalog):
    '''
    '''

    def __init__(self, facility, request, *args, **kwargs):
        '''
        '''
        self.catalog = HFIRCom(request)

    def experiments(self, instrument):
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
        response = self.catalog.experiments(instrument)
        result = []
        if response is not None:
            try:
                for entry in response:
                    entry['ipts'] = entry.pop('name')
                    entry['date'] = dateparse.parse_datetime(entry['latest']['created'])
                    entry['exp'] = sorted([
                            tag.split('/')[1] for tag in entry['tags']])
                    result.append(entry)
                    
            except KeyError as this_exception:
                logger.exception(this_exception)
            except IndexError as this_exception:
                logger.exception(this_exception)

        # logger.debug(pformat(result))
        return result

    @staticmethod
    def _runs_elem_sans(entry):
        elem = {}
        try:
            elem['location'] = entry['location']
            elem['modified'] = dateparse.parse_datetime(entry['modified'])
            elem['thumbnails'] = entry['thumbnails']
            elem['filename'] = entry['metadata']['spicerack']['@filename']
            # elem['end_time'] = entry['metadata']['spicerack']['@end_time']
            elem['title'] = entry['metadata']['spicerack']['header']['scan_title']
            elem['sample_info'] = entry['metadata']['spicerack']['sample_info']['sample']['field'] if entry['metadata']['spicerack']['sample_info']['sample'] else ""
            elem['sample_background'] = entry['metadata']['spicerack']['sample_info']['background']['field'] if entry['metadata']['spicerack']['sample_info']['background'] else ""
            elem['sample_parameters'] = entry['metadata']['spicerack']['sample_info']['parameters']['field'] if entry['metadata']['spicerack']['sample_info']['parameters'] else ""
            # This gets rid of None values in the metadata
            elem['metadata'] = {(key): (value if value is not None else "") for key, value in entry['metadata']['spicerack']['header'].items()}
            elem['motor_positions'] = {(key): (value if value is not None else "") for key, value in entry['metadata']['spicerack']['motor_positions'].items()}
        except KeyError as this_exception:
            logger.exception(this_exception)
        except IndexError as this_exception:
            logger.exception(this_exception)
        return elem

    @staticmethod
    def _runs_elem_tas(entry):
        elem = {}
        try:
            elem['title'] = entry['metadata']['scan_title']
            elem['location'] = entry['location']
            elem['modified'] = dateparse.parse_datetime(entry['modified'])
            elem['filename'] = os.path.basename(entry['location'])
            #elem['metadata'] = entry['metadata']
        except KeyError as this_exception:
            logger.exception(this_exception)
        except IndexError as this_exception:
            logger.exception(this_exception)
        return elem    

    RUNS_ELEM_FUNC = {
        'DEFAULT': _runs_elem_sans,
        'CG2': _runs_elem_sans,
        'CG3': _runs_elem_sans,
        'CG4C': _runs_elem_tas,
        'HB1': _runs_elem_tas,
        'HB1A': _runs_elem_tas,
        'HB3': _runs_elem_tas,
    }

    def runs(self, instrument, ipts, exp):
        '''

        '''
        response = self.catalog.runs(instrument, ipts, exp)
        result = []
        if response is not None:
            # logger.debug("Response from comunication Run %s %s %s:\n%s", instrument, ipts, exp, pformat(response))
            for entry in response:
                # This is the only way to call static methods in a dict
                elem = self.RUNS_ELEM_FUNC.get(
                    instrument, self.RUNS_ELEM_FUNC['DEFAULT']).__func__(entry)
                result.append(elem)

        # logger.debug("Response sent to view for Get Run %s %s %s:\n%s", instrument, ipts, exp, pformat(response))
        return result



    def runs_as_table(self, instrument, ipts, exp):
        '''
        Same as runs but split sample_* in tables
        Returns 2 lists:
        - headers
        - list of rows
        This is used when filling in the reduction spreadsheet
        '''

        # Let's make a rubset first
        data = self.runs(instrument, ipts, exp)
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

    def _parse_filename(self, filename):
        '''
        filename of the form
        BioSANS_exp379_scan0500_0001.xml'
        return: instrument, exp number, scan number, frame number
        '''
        regex = r"(\w+)_exp(\d+)_scan(\d+)_(\d+)\.xml"
        match = re.search(regex, filename)
        if match:
            return match.group(1), int(match.group(2)), int(match.group(3)), \
                int(match.group(4))
        else:
            return None

    def _data(self, filename):
        '''
        Parses the HFIR SANS XML file and extracts the detector data
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
        Called by function run
        Only deals with the metadata
        '''
        response = self.catalog.run(instrument, ipts, file_location)
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
                        'filename': entry['metadata']['spicerack']['@filename'] if entry['metadata'].get('spicerack') else None,
                        'metadata': entry['metadata']['spicerack']['header'] if entry['metadata'].get('spicerack') else  entry['metadata'],
                        'sample_info': entry['metadata']['spicerack']['sample_info'] if entry['metadata'].get('spicerack') else None,
                    })
            except KeyError as this_exception:
                logger.exception(this_exception)
            except IndexError as this_exception:
                logger.exception(this_exception)
        return result

    def run(self, instrument, ipts, file_location):
        '''
        Gets run_info (metadata) and adds the data for plotting
        '''
        run_info = self.run_info(instrument, ipts, file_location)
        if run_info.get('thumbnails'):
            run_info.pop('thumbnails', None) # remove the thumbnails
            run_info['data'] = self._data(file_location)
        return run_info
