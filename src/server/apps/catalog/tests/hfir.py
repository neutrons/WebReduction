from django.test import TestCase

from ..oncat.communication import HFIR as HFIRCom
from ..oncat.communication import SNS as SNSCom


class HFIRONCatTests(TestCase):
    '''
    '''
    def setUp(self):
        self.cat = HFIRCom()

    def test_experiments_for_cg3(self):
        res = self.cat.experiments("CG3")
        dict_to_find = {
            'exts': ['.dat', '.xml'],
            'id': 'IPTS-18155',
            'name': 'IPTS-18155',
            'tags': [
                'spice/exp401',
                'spice/exp405',
                'spice/exp410',
                'spice/exp429',
                'spice/exp438',
                'type/raw'
            ],
            'type': 'experiment',
        }
        found = False
        for i in res:
            if set(dict_to_find.items()).issubset(set(i.items())):
                found = True
                break
        self.assertTrue(found)
    
    
    def test_experiments_for_cg3(self):
        res = self.cat.experiments("CG3", ipts='IPTS-19469', exp='exp406')
        dict_to_find = {
            'exts': ['.dat', '.xml'],
            'id': 'IPTS-18155',
            'name': 'IPTS-18155',
            'tags': [
                'spice/exp401',
                'spice/exp405',
                'spice/exp410',
                'spice/exp429',
                'spice/exp438',
                'type/raw'
            ],
            'type': 'experiment',
        }
        found = False
        for i in res:
            if set(dict_to_find.items()).issubset(set(i.items())):
                found = True
        self.assertTrue(found)



    # # ## HFIR
    # oncat = HFIR()
    # # res = oncat.experiments("CG3")
    # res = oncat.runs("CG3", ipts='IPTS-19469', exp='exp406')
    # # res = oncat.run("CG3", 'IPTS-19469', '/HFIR/CG3/IPTS-19469/exp406/Datafiles/BioSANS_exp406_scan0016_0001.xml')
