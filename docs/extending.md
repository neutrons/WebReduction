# Extending Configuration

Note that there's a priority oin the way the application looks for models, forms or templates.

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

## Model


## Make the model visible in the admin


## Form

