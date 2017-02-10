from channels.routing import include
'''
Django channels routing
'''

channel_routing = [
    include('django_remote_submission.routing.channel_routing', path=r'^'),
]