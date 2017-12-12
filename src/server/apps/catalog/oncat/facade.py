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
    The main methods to be defined in the subclasses are here.
    '''

    # __metaclass__ = CatalogMeta

    def __new__(cls, facility, technique, instrument, *args, **kwargs):
        '''
        This allows to great subclasses from this base class,
        given:
        - facility name
        - technique name
        - instrument name
        See in the database for every instrument the valid
        - instrument.facility.name
        - instrument.name
        - instrument.technique

        The Catalog should be constructed like these examples:
        sns = Catalog("SNS")
        hfir = Catalog("HFIR")
        hfir_sans = Catalog("HFIR", "SANS")
        hfir_sans = Catalog(facility="HFIR", technique="SANS")
        
        '''

        # Get the subclasses of Catalog
        subclasses = Catalog.subclasses(Catalog)
        # To get first the very subclasses (more specific)
        subclasses.reverse()

        for subclass in subclasses:
            if str(subclass.__name__) == facility+technique+instrument:
                return super(cls, subclass).__new__(subclass)
            elif str(subclass.__name__) == facility+technique:
                return super(cls, subclass).__new__(subclass)
            elif str(subclass.__name__) == facility:
                return super(cls, subclass).__new__(subclass)
        raise Exception('Facility not supported: {}!'.format(
            facility+technique+instrument))
    
    def __init__(self, facility, technique, instrument, request):
        self.facility = facility
        self.technique = technique
        self.instrument = instrument
        self.request = request
    
    def __str__(self):
        return "Catalog for {} :: {} :: {}".format(
            self.facility, self.technique, self.instrument
        )
    
    @staticmethod
    def subclasses(root):
        '''
        This function performs a:
        level_order_tree_traversal
        (Google to know what this is)
        on the hierarchy tree of classes.
        @return a list with all the classes types 
        '''
        out = []
        q = []
        q.append(root)
        while q:
            v = q.pop(0)
            out.append(v)
            for child in v.__subclasses__():
                q.append(child)
        return out

    #
    # Experiments
    #
    def experiments_specific(self, entry):
        '''
        This will update the experiments return list of dictionaries
        This is to specialised in any subclass when needed
        '''
        return {}

    def experiments(self):
        '''
        Common to HFIR and SNS
        For HFIR: See if in there tags that start with spice, e.g.:
        'tags': ['spice/exp579', 'spice/exp581', 'type/raw'],
        '''
        response = self.catalog.experiments(self.instrument)
        result = []
        if response is not None:
            try:
                for entry in response:
                    entry['ipts'] = entry.pop('name')
                    entry['modified'] = dateparse.parse_datetime(entry['latest']['modified'])
                    entry.update(self.experiments_specific(entry))
                    result.append(entry)
            except KeyError as this_exception:
                logger.exception(this_exception)
            except IndexError as this_exception:
                logger.exception(this_exception)

        # logger.debug(pformat(result))
        return result

    #
    # RUNS
    #
    RUNS_PROJECTION = []

    def runs_specific(self, entry):
        '''
        '''
        return {}
    
    def runs(self, ipts, exp=None):
        '''


        '''
        if exp is None:
            response = self.catalog.runs(self.instrument, ipts,
                                         projection=self.RUNS_PROJECTION,
                                         extensions=self.RUNS_EXTENSIONS)
        else:
            response = self.catalog.runs(self.instrument, ipts, exp,
                                         projection=self.RUNS_PROJECTION,
                                         extensions=self.RUNS_EXTENSIONS)

        # logger.debug("Raw Response from Communication: %s:\n%s", instrument, pformat(response))
        result = []
        
        if response is not None:
            for entry in response:
                elem = {}
                elem['location'] = entry['location']
                elem['modified'] = dateparse.parse_datetime(entry['modified'])
                elem.update(self.runs_specific(entry))
                result.append(elem)
        return result

    @abstractmethod
    def run(self, ipts, *args, **kwargs):
        pass


################################################################################
#
# SNS
#
################################################################################

class SNS(Catalog):
    '''
    '''
    # Some of the NeXus files don't have an entry as first group

    RUNS_ENTRY = 'entry'

    RUNS_PROJECTION = [
        'location',
        'modified',
        'metadata.entry.run_number',
        'metadata.entry.title',
        'metadata.entry.start_time',
        'metadata.entry.end_time',
        'metadata.entry.duration',
        'metadata.entry.total_counts',
    ]
    
    RUNS_EXTENSIONS = ['.nxs', '.nxs.h5']

    def __init__(self, *args, **kwargs):
        '''
        '''
        super().__init__(*args, **kwargs) 
        self.catalog = SNSCom(self.request)


    def runs_specific(self, entry):
        '''
        '''
        elem = {}
        elem['metadata'] = {
            (key): (value if value is not None else "") for key, value \
                in entry['metadata'][self.RUNS_ENTRY].items()
        }
        elem['title'] = elem['metadata']['title']
        return elem


    def run(self, ipts, file_location):
        '''

        '''
        response = self.catalog.run(self.instrument, ipts, file_location)

        logger.debug("Getting run details for %s %s -> %s", self.instrument, ipts, file_location)

        if response is not None:
            try:
                entry = response
                result = dict(
                    {
                        # subset
                        k: entry[k] for k in ('location',)

                    }, **{
                        'metadata': entry['metadata'][self.RUNS_ENTRY],
                    })
            except KeyError as this_exception:
                logger.exception(this_exception)
            except IndexError as this_exception:
                logger.exception(this_exception)
        # This solves de None / NaN conversion
        return result


class SNSReflectometry(SNS):
    
    # RUNS_ENTRY = 'entry'
    
    RUNS_PROJECTION = [
        'location',
        'modified',
        'metadata.entry.run_number',
        'metadata.entry.title',
        'metadata.entry.start_time',
        'metadata.entry.end_time',
        'metadata.entry.duration',
        'metadata.entry.total_counts',
    ]

class SNSSANS(SNS):
    pass


class SNSSANSEQSANS(SNS):
    
    RUNS_PROJECTION = [
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
    ]

    def runs_specific(self, entry):
        elem = super().runs_specific(entry)
        try:
            # frame_skipping=speed1 - frequency / 2.0) < 1.0
            elem['is_frame_skipping'] = entry['metadata'][self.RUNS_ENTRY]['daslogs']['speed1']['average_value'] \
                - entry['metadata'][self.RUNS_ENTRY]['daslogs']['frequency']['average_value'] / 2.0 < 1.0
        except KeyError:
            elem['is_frame_skipping'] = ""
        return elem


################################################################################
#
# HFIR
#
################################################################################


class HFIR(Catalog):
    '''
    '''

    RUNS_EXTENSIONS = ['.xml', '.dat']

    def __init__(self, *args, **kwargs):
        '''
        '''
        super().__init__(*args, **kwargs) 
        self.catalog = HFIRCom(self.request)

    def experiments_specific(self, entry):
        '''
        For HFIR specific stuff happening for every entry in the
        experiments list
        '''
        d = {}
        if any(tag.startswith("spice") for tag in entry['tags']):
            d['exp'] = sorted([
                tag.split('/')[1] for tag in entry['tags']])
        return d

    
    def runs_specific(self, entry):
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

    def run_info(self, ipts, file_location):
        '''
        Called by function run
        Only deals with the metadata
        '''
        response = self.catalog.run(self.instrument, ipts, file_location)
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

    def run(self, ipts, file_location):
        '''
        Gets run_info (metadata) and adds the data for plotting
        '''
        run_info = self.run_info(ipts, file_location)
        if run_info.get('thumbnails'):
            run_info.pop('thumbnails', None) # remove the thumbnails
            run_info['data'] = self._data(file_location)
        return run_info


class HFIRSANS(HFIR):

    RUNS_EXTENSIONS = ['.xml']

    RUNS_PROJECTION = [
        'location',
        'modified',
        'metadata.spicerack.@filename',
        'metadata.spicerack.@end_time',
        'metadata.spicerack.header',
        'metadata.spicerack.sample_info',
        'thumbnails',
        'metadata.spicerack.motor_positions',
    ]
    
    def runs_specific(self, entry):
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

    def runs_as_table(self, ipts, exp):
        '''
        Same as runs but split sample_* in tables
        Returns 2 lists:
        - headers
        - list of rows
        This is used when filling in the reduction spreadsheet
        '''

        # Let's make a rubset first
        data = self.runs(self.instrument, ipts, exp)
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


class HFIRTAS(HFIR):

    RUNS_EXTENSIONS = ['.dat']

    
            