#
# Filters for templates
#
import re
import os
import logging

from django import template

logger = logging.getLogger(__name__)  # pylint: disable=C0103

register = template.Library()  # pylint: disable=C0103

#
# Auxiliary filters used only for building script
#


@register.filter(name='my_filter')
def my_filter(value):
    return "Output of my filter: " + str(value)


@register.simple_tag(takes_context=True)
def filename(context, arg):
    '''
    This will give the filenames based on runs:
    1 or 1_1
    '''
    logger.debug("TAG: Checking for filename: %s", arg)
    c = {}
    # 1 or 1_1
    r = re.search(r"^(\d+)(_(\d+))?$", str(arg))
    if r:
        if r.group(3):
            c["scan_number"] = int(r.group(1))
            c["frame_number"] = int(r.group(3))
        else:
            c["scan_number"] = int(r.group(1))
            c["frame_number"] = 1
        context.update(c)
        filename = context['data_file_path_template'] % context
    else:
        filename = arg
    if os.path.isfile(filename):
        return filename
    else:
        raise FileNotFoundError(filename)


@register.simple_tag
def raise_exception(message):
    raise template.TemplateSyntaxError(message)
