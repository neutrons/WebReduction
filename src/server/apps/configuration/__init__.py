from collections import OrderedDict
from django.apps import AppConfig, apps


class BaseAppConfig(AppConfig):
    def __init__(self, *args, **kwargs):
        super(BaseAppConfig, self).__init__(*args, **kwargs)
        # Also import the models in modules defined in self.name
        mod_path, _, cls_name = self.name.rpartition('.')
        self.import_models(OrderedDict([(k, v) for k, v in apps.all_models[cls_name].iteritems() if self.name in v.__module__]))


    def import_models(self, all_models):
        if not self.models:
            # Set the model app_labels as self.label
            for m in all_models.values():
                m._meta.app_label = self.label
            super(BaseAppConfig, self).import_models(all_models)