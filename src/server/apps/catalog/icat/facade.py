'''
Class that VIEWS will use!

Do not call function inside this package!!!
'''
import logging

from server.apps.catalog.icat.sns.facade import Catalog as SNSICat
from server.apps.catalog.icat.hfir.facade import Catalog as HFIRICat

logger = logging.getLogger(__name__)

def not_implemented(fargs,*args,**kwargs):
    #pylint: disable=unused-argument
    logger.warning("You called a Not implemented function!")
    return None


REGISTRY = {
    'SNS': {
        'get_expriments': SNSICat().get_experiments_meta,
        'get_runs': SNSICat().get_runs_all,
        'get_run': not_implemented,
        'get_runs_as_table': not_implemented,
    },
    'HFIR': {
        'get_expriments': HFIRICat().get_experiments,
        'get_runs': HFIRICat().get_runs, #(instrument, ipts, exp):
        'get_runs_as_table': HFIRICat().get_runs_as_table,
        'get_run': HFIRICat().get_run,
    }

}


def get_expriments(facility, instrument):
    experiments = REGISTRY[facility]['get_expriments'](instrument)
    return experiments

def get_runs(facility, instrument, ipts, exp=None):
    if exp is None or exp == "exp0":
        runs = REGISTRY[facility]['get_runs'](instrument, ipts)
    else:
        runs = REGISTRY[facility]['get_runs'](instrument, ipts, exp)
    return runs

def get_runs_as_table(facility, instrument, ipts, exp=None):
    if exp is None or exp == "exp0":
        runs = REGISTRY[facility]['get_runs_as_table'](instrument, ipts)
    else:
        runs = REGISTRY[facility]['get_runs_as_table'](instrument, ipts, exp)
    return runs

def get_run(facility, instrument, ipts, file_location):
    run = REGISTRY[facility]['get_run'](instrument, ipts, file_location)
    return run


if __name__ == "__main__":
    from pprint import pprint
    #experiments = REGISTRY['HFIR']['get_expriments']('CG2')
    # experiments = get_expriments('HFIR', 'CG2')
    # print(experiments)
    runs = get_runs('HFIR', 'CG3', 'IPTS-17241', 'exp381')
    pprint(runs)
    # runs = get_runs('SNS', 'TOPAZ', 'IPTS-18330')
    # pprint(runs)
    