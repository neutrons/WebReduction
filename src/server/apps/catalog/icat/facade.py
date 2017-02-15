'''
Class the instruments will use!
'''

from server.apps.catalog.icat.sns.facade import Catalog as SNSICat
from server.apps.catalog.icat.hfir.facade import Catalog as HFIRICat


REGISTRY = {
    'SNS' : {
        'get_expriments' : SNSICat().get_experiments_meta
    },
    'HFIR' : {
        'get_expriments' : HFIRICat().get_experiments
    }

}



def get_expriments(facility, instrument):
    experiments = REGISTRY[facility]['get_expriments'](instrument)
    return experiments


'''
SNS catalog

from .icat.sns.facade import Catalog

icat = Catalog()
iptss = icat.get_experiments_meta(kwargs['instrument'])

--

            icat = Catalog()
            runs = icat.get_runs_all(instrument, ipts)
--

icat = Catalog()
experiment_list = icat.get_experiments_id_and_title(instrument)



'''

if __name__ == "__main__":
    #experiments = REGISTRY['HFIR']['get_expriments']('CG2')
    experiments = get_expriments('HFIR', 'CG2')
    print(experiments)