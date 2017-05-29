#
# Filters for templates
#
from django import template

register = template.Library()  # pylint: disable=C0103

#
# Auxiliary filters used only for building script
#


@register.filter(name='my_filter')
def my_filter(value):
    return "Output of my filter: " + str(value)


@register.simple_tag(takes_context=True)
def filename(context, arg):
    return "/tmp/"+ str(context['ipts']) +"/" + str(arg)
