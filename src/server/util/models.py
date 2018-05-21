class ModelMixin(object):


    def get_all_fields(self, fields_to_ignore=('id', 'user')):
        """
        Returns a list of all field names on the instance.
        """
        fields = []
        for f in self._meta.fields:
            fname = f.name
            # resolve picklists/choices, with get_xyz_display() function
            get_choice = 'get_' + fname + '_display'
            if hasattr(self, get_choice):
                value = getattr(self, get_choice)()
            else:
                try:
                    value = getattr(self, fname)
                except AttributeError:
                    value = None
            # only display fields with values and skip some fields entirely
            # if f.editable and value and f.name not in ('id', 'user') : # Hide None
            if f.editable and f.name not in fields_to_ignore:
                fields.append({
                    'label': f.verbose_name,
                    'name': f.name,
                    'value': value,
                })
        return fields