'''
Class that VIEWS will use!

Do not call function inside this package!!!
'''

from server.apps.catalog.icat.sns.facade import Catalog as SNSICat
from server.apps.catalog.icat.hfir.facade import Catalog as HFIRICat


REGISTRY = {
    'SNS' : {
        'get_expriments' : SNSICat().get_experiments_meta,
        'get_runs' : SNSICat().get_runs_all
    },
    'HFIR' : {
        'get_expriments' : HFIRICat().get_experiments,
        'get_runs' : HFIRICat().get_runs #(instrument, ipts, exp):
    }

}


def get_expriments(facility, instrument):
    experiments = REGISTRY[facility]['get_expriments'](instrument)
    return experiments

def get_runs(facility, instrument, ipts, exp=None):
    if exp is None:
        runs = REGISTRY[facility]['get_runs'](instrument, ipts)
    else:
        runs = REGISTRY[facility]['get_runs'](instrument, ipts, exp)
    return runs


if __name__ == "__main__":
    from pprint import pprint
    #experiments = REGISTRY['HFIR']['get_expriments']('CG2')
    # experiments = get_expriments('HFIR', 'CG2')
    # print(experiments)
    runs = get_runs('HFIR', 'CG3', 'IPTS-17241', 'exp381')
    pprint(runs)
    # runs = get_runs('SNS', 'TOPAZ', 'IPTS-18330')
    # pprint(runs)
    