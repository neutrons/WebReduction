# Configuration

Note that there's a priority in the way the application looks for models, forms or templates.

The schema is:

```
Technique / Facility / Instrument
```

First the application will look for the more specific and if it doesn't find it, go to the less specific.

```
['SpectrometrySnsHyspecConfiguration',
 'SpectrometrySnsConfiguration',
 'SpectrometryConfiguration',
 'Configuration']
```

For the schema names see the instrument table in the database or `src/fixtures/catalog.json`.

## Model

Create a model in:
`src/server/apps/configuration/models`

Folowing the naming convention above. E.g.: `spectrometry_sns_hyspec.py`

In the file define your model, e.g.:

```python
from django.db import models

from .abstract import Configuration


class SpectrometrySnsHyspecConfiguration(Configuration):

    wavelength = models.DecimalField(...)


    configuration_file = models.CharField(
        ...
    )

    @models.permalink
    def get_absolute_url(self):
        return ('configuration:configuration_detail', [self.pk])

```

Note that all fields ending with `file` will be treated as server side browsing.

### Make the model visible in the admin

See `src/server/apps/configuration/admin.py`

### Form

Create a form similar to models nomenclature above,

See `src/server/apps/configuration/forms/spectrometry_sns_hyspec.py`

```python
from django.forms import ModelForm

from ..models import SpectrometrySnsHyspecConfiguration as m
from .abstract import Configuration


class SpectrometrySnsHyspecConfiguration(Configuration, ModelForm):
    class Meta(Configuration.Meta):
        model = m

```
