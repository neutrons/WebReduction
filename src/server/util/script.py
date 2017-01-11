from django.template import Template, Context, Engine

from pprint import pformat
import os
import logging
import errno

logger = logging.getLogger('util.script')


def build_script(script_template_file_path, data):
    '''
    Build a script from a template file @script_file_path,
    @data is a dictionary
    @return script as string
    '''
    logger.debug(pformat(data))
    if not os.path.exists(script_template_file_path):
        logger.error("Template file %s does not exist."%script_template_file_path)
        raise FileNotFoundError(
             errno.ENOENT, os.strerror(errno.ENOENT), script_template_file_path)
    script_filtered = ""
    if os.path.isfile(script_template_file_path):
        with open(script_template_file_path) as f:
            lines = f.readlines()
            #text = '\n'.join(lines)
            text = ''.join(lines)
            template = Template(text)            
            context = Context(data)
            script = template.render(context)
            #script_filtered = "\n".join([ll.rstrip() for ll in script.splitlines() if ll.strip()])
            script_filtered = script
    else:
        logger.error("Template file %s does not exist!"%script_template_file_path)
    return script_filtered