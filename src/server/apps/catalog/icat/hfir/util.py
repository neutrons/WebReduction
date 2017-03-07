
#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os, sys
import xml.etree.ElementTree as ET
import numpy as np

'''
This parses the HFIR XML File

will probably only be used for Data Analysis

'''

import logging
logger = logging.getLogger(__name__)

class Parser(object):
    '''
    Generic HFIR files parser
    '''
    def __init__(self, filename):
        if not os.path.exists(filename):
            logger.error("File {} does not exist!".format(filename))
        else:
            self._root = self._parse(filename)
    
    def _parse(self, filename):
        logger.info("Parsing: %s."%filename)
        tree = ET.parse(filename)
        root = tree.getroot()
        return root  

    def getMetadata(self, xpath):
        '''
        Given Xpath returns either float or string
        '''
        elems = self._root.findall(xpath)
        if not elems:
            logger.warning("xpath %s is not valid!"%xpath)
            return None
        elif len(elems) >1:
            logger.warning("xpath %s has more than one element (len = %d)! Returning first!"%(xpath,len(elems)))
        value_as_string = elems[0].text
        try:
            return float(value_as_string)
        except ValueError:
            return value_as_string

        return

    def getData(self,xpath):
        '''
        Parses the XML xpath data into a 2D Xarray
        '''
        data_str = self.getMetadata(xpath)
        if data_str:
            data_list_of_chars = [line.split("\t") for line in data_str.strip().split("\n")]
            data = [list(map(int, line)) for line in data_list_of_chars]
            data_np = np.array(data)
            data_np = np.rot90(data_np)
            data_np = np.flipud(data_np)
            return data_np
        else:
            return None


if __name__ == "__main__":
    '''
    Stupid test:
    Reads a Biosans folder and generates images for both main and wing detector
    Images are in base64
    Both linear and log
    '''
    from PIL import Image
    from io import BytesIO
    from base64 import b64encode
    from matplotlib.colors import Normalize, LogNorm
    from matplotlib import cm
    import glob

    with open("/tmp/test.html", "w") as f:
        f.write('<html><hr/>') 
        input_files = glob.glob("/HFIR/CG3/IPTS-0000/exp369/Datafiles/BioSANS*xml")
        for input_file in input_files:
            p = Parser(input_file)
            data_main_detector = p.getData("Data/Detector")
            data_wing_detector = p.getData("Data/DetectorWing")

            f.write("<pre>Main / Wing / Log(Main) / Log(wing) :: {}</pre>".format(input_file)) 

            b = BytesIO()
            norm = Normalize(clip=True)
            c = cm.viridis(norm(data_main_detector), bytes=True)
            Image.fromarray(c).save(b, format='png')
            data_as_binary = b64encode(b.getvalue())
            data_as_string = data_as_binary.decode('utf-8')
            s=('<img src="data:image/png;base64,{!s}">'.format(data_as_string))
            f.write(s+"&nbsp;") 

            b = BytesIO()
            norm = Normalize(clip=True)
            c = cm.viridis(norm(data_wing_detector), bytes=True)
            Image.fromarray(c).save(b, format='png')
            data_as_binary = b64encode(b.getvalue())
            data_as_string = data_as_binary.decode('utf-8')
            s=('<img src="data:image/png;base64,{!s}">'.format(data_as_string))
            f.write(s+"&nbsp;") 

            b = BytesIO()
            norm = LogNorm(clip=True)
            c = cm.viridis(norm(data_main_detector), bytes=True)
            Image.fromarray(c).save(b, format='png')
            data_as_binary = b64encode(b.getvalue())
            data_as_string = data_as_binary.decode('utf-8')
            s=('<img src="data:image/png;base64,{!s}">'.format(data_as_string))
            f.write(s+"&nbsp;") 

            b = BytesIO()
            norm = LogNorm(clip=True)
            c = cm.viridis(norm(data_wing_detector), bytes=True)
            Image.fromarray(c).save(b, format='png')
            data_as_binary = b64encode(b.getvalue())
            data_as_string = data_as_binary.decode('utf-8')
            s=('<img src="data:image/png;base64,{!s}">'.format(data_as_string))
            f.write(s+"<hr/>")

        f.write("<hr/></html>\n")