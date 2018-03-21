from django.core.signals import request_started
from django.apps import AppConfig

# def f(sender,  **kwargs):
#     print(80*"*")
#     print(sender, kwargs)

class ReductionConfig(AppConfig):
    name = 'server.apps.reduction'
    label = 'reduction'

    # def ready(self):
    #     request_started.connect(f)
