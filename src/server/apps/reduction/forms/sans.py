from .abstract import ReductionForm
from crispy_forms.helper import FormHelper
from crispy_forms.layout import Submit, Button, Layout, Fieldset, HTML, Field

class SansRegionForm(ReductionForm):
    def __init__(self, *args, **kwargs):
        super(SansRegionForm, self).__init__(*args, **kwargs)
        self.helper = FormHelper(self)
        self.helper.form_class = 'form-horizontal'
        self.helper.render_required_fields = True
        self.helper.form_tag = False
        self.helper.render_hidden_fields = True
        self.helper.layout = Layout(
            Fieldset(
                '', # TITLE
                'comments', 'configuration', 'empty_beam_run',
                'beam_center_run', 'entries',
            )
        )