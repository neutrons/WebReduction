#!/usr/bin/env python
# -*- coding: utf-8 -*-

import json
import logging
import os
import sys

from django.template import Context, Engine, Template


logger = logging.getLogger(__name__)  # pylint: disable=C0103
logging.basicConfig(level=logging.DEBUG)


class ScriptBuilder(object):

    def __init__(self, template_path, json_path):

        if not os.path.isfile(template_path):
            logger.error("{} is not a file.".format(template_path))
        if not os.path.isfile(json_path):
            logger.error("{} is not a file.".format(json_path))

        self.template_path = template_path

        json_data_str = open(json_path).read()
        print(json_data_str)
        self.json_data = json.loads(json_data_str)  # str to dict

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
                raise e
            return script
        return ""


if __name__ == "__main__":

    if (len(sys.argv) != 3):
        logger.info("Use {} <template file> <json file>".format(sys.argv[0]))
        sys.exit(os.EX_CONFIG)

    script_builder = ScriptBuilder(sys.argv[1], sys.argv[2])
    res = script_builder.build_script()
    print(res)
