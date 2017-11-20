from django import template

register = template.Library()

@register.filter(name='remove_none')
def remove_none(d, default=''):
    '''
    Remove None in a Dict value
    '''
    for k, v in d.items():
        if isinstance(v, dict):
            d[k] = remove_none(v, default)
        else:
            if (d[k] == None):
                d[k] = default
    return d