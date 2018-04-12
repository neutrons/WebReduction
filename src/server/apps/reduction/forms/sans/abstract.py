from ..abstract import RegionForm
from crispy_forms.helper import FormHelper
from crispy_forms.layout import Submit, Button, Layout, Fieldset, HTML, Field


class RegionForm(RegionForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.helper.layout = Layout(
            Fieldset(
                '', # TITLE
                'comments', 'configuration', 'empty_beam_run',
                'beam_center_run', 'entries',
            )
        )
