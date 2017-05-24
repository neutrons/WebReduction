from django.template import Template, Context, Engine

from pprint import pformat
import os
import logging
import errno

from server.settings.env import ROOT_DIR
from django import template

register = template.Library()  # pylint: disable=C0103

logger = logging.getLogger(__name__)  # pylint: disable=C0103

# Script template locations
LOCATIONS = {
    "EQSANS": None,
    "BioSANS": ROOT_DIR("../config/reduction/biosans.tpl"),
    "GPSANS": ROOT_DIR("../config/reduction/gpsans.tpl"),
}


class ScriptBuilder(object):

    def __init__(self, instrument_name, data):
        self.template_file_path = LOCATIONS[instrument_name]
        self.data = data
        logger.debug(pformat(self.data))

    def build_script(self):
        '''
        Build a script from a template file @script_file_path,
        @data is a dictionary / json
        @return script as string
        '''
        X = 123
        logger.debug(pformat(self.data))
        if not os.path.exists(self.template_file_path):
            logger.error("Template file %s does not exist.",
                         self.template_file_path)
            raise FileNotFoundError(
                errno.ENOENT,
                os.strerror(errno.ENOENT),
                self.template_file_path)
        script_filtered = ""
        if os.path.isfile(self.template_file_path):
            with open(self.template_file_path) as f:
                lines = f.readlines()
                # text = '\n'.join(lines)
                text = ''.join(lines)
                template = Template(text,
                    engine=Engine(
                        builtins=['server.util.script'],
                        context_processors=my_context_processor
                    )
                )
                context = Context(self.data)
                script = template.render(context)
                # script_filtered = "\n".join([ll.rstrip() for ll in script.splitlines() if ll.strip()])
                script_filtered = script
        else:
            logger.error("Template file %s does not exist!", self.template_file_path)
        return script_filtered

#
# Auxiliary filters used only for building script
#

def my_context_processor(request):
    return {'X': 123}

@register.filter(name='cut2')
def cut2( value):
    return X






