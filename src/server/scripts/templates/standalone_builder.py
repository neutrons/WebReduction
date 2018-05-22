#!/usr/bin/env python
# -*- coding: utf-8 -*-

import json
import logging
import os
import sys
from decimal import Decimal
from django.template import Context, Engine, Template


logger = logging.getLogger(__name__)  # pylint: disable=C0103
logging.basicConfig(level=logging.DEBUG)

from django.conf import settings
settings.configure()


# Data Must be defined here as a dictionary:

DATA = {'configuration': {'Save_md_events': True,
                          'correct_transmission': True,
                          'e_max_fraction': Decimal('2.00'),
                          'e_min_fraction': Decimal('1.00'),
                          'e_step': Decimal('3.00'),
                          'id': 1,
                          'instrument': 18,
                          'masks': [{'bank': '4',
                                     'configuration': 1,
                                     'id': 2,
                                     'pixel': '6',
                                     'tube': '5'},
                                    {'bank': '1',
                                     'configuration': 1,
                                     'id': 1,
                                     'pixel': '3',
                                     'tube': '2'}],
                          'normalization_file': '/SNS/HYS/IPTS-13173/shared/autoreduce/msk_tube/HYS_70336_msk_tube.nxspe',
                          'title': 'Conf complete',
                          'user': 1},
        'data_file_path_template': '',
        'experiment_number': '',
        'id': 1,
        'instrument': 18,
        'instrument_name': 'HYSPEC',
        'ipts_number': 'IPTS-17915',
        'job': None,
        'q1_projection': '0,1,0',
        'q2_projection': '0,1,0',
        'q3_projection': '0,1,0',
        'regions': [{'axis_0': 'Q1',
                     'axis_1': 'Q2',
                     'axis_2': 'Q3',
                     'axis_3': 'Q3',
                     'id': 2,
                     'max_0': Decimal('23.00'),
                     'max_1': Decimal('23.00'),
                     'max_2': Decimal('23.00'),
                     'max_3': Decimal('23.00'),
                     'min_0': Decimal('1.00'),
                     'min_1': Decimal('1.00'),
                     'min_2': Decimal('1.00'),
                     'min_3': Decimal('1.00'),
                     'name': 'Plot 1',
                     'nsteps_0': 200,
                     'nsteps_1': 200,
                     'reduction': 1}],
        'run_type': 1,
        'script_execution_path': '/SNS/HYS/IPTS-17915/shared/autoreduction',
        'script_interpreter': 1,
        'title': 'Reduction complete',
        'ub_a': Decimal('90.0000'),
        'ub_alpha': Decimal('90.0000'),
        'ub_b': Decimal('80.0000'),
        'ub_beta': Decimal('90.0000'),
        'ub_c': Decimal('50.0000'),
        'ub_gamma': Decimal('120.0000'),
        'ub_u_vector': '1,0,0',
        'ub_v_vector': '0,1,0',
        'user': 'rhf'}


class ScriptBuilder(object):

    def __init__(self, template_path):

        if not os.path.isfile(template_path):
            logger.error("{} is not a file.".format(template_path))
        
        self.template_path = template_path
        self.json_data = DATA

        self.engine = Engine(
            # debug=True,
        )

    def build_script(self):

        with open(self.template_path) as f:
            text = f.read()
            template = Template(
                text,
                engine=self.engine,
            )
            context = Context(self.json_data)
            try:
                script = template.render(context)
            except Exception as e:
                logger.exception(e)
                raise e
            return script
        return ""


if __name__ == "__main__":

    if (len(sys.argv) != 2):
        logger.info("Use {} <template file>".format(sys.argv[0]))
        sys.exit(os.EX_CONFIG)

    script_builder = ScriptBuilder(sys.argv[1])
    res = script_builder.build_script()
    print(res)
