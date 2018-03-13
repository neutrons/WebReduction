from .abstract import ReductionForm
from crispy_forms.helper import FormHelper
from crispy_forms.layout import Submit, Button, Layout, Fieldset, HTML, Field

class SansRegionForm(ReductionForm):
    def __init__(self, *args, **kwargs):
        super(SansRegionForm, self).__init__(*args, **kwargs)
        self.helper.layout = Layout(
            Fieldset(
                '', # TITLE
                'comments', 'configuration', 'empty_beam_run',
                'beam_center_run', 'entries',
            )
        )