from django.db import models
from django.core.validators import RegexValidator

from server.apps.configuration.models.abstract import ModelMixin

class MaskManager(models.Manager):
    '''
    Queries go here!!
    '''
    use_for_related_fields = True


class Mask(models.Model, ModelMixin):
    '''
    This mimicks the Masks in Ubuntu

    http://docs.mantidproject.org/nightly/algorithms/MaskBTP-v1.html#algm-maskbtp
    It masks:
    Bank	Input	string	 	Bank(s) to be masked. If empty, will apply to all banks
    Tube	Input	string	 	Tube(s) to be masked. If empty, will apply to all tubes
    Pixel	Input	string	 	Pixel(s) to be masked. If empty, will apply to all pixels
    '''

    created_date = models.DateTimeField(auto_now_add=True)
    modified_date = models.DateTimeField(auto_now=True)

    bank =  models.CharField(
        "Bank",
        max_length=256,
        blank=True,
        validators=[
            RegexValidator(
                regex='^\d+([,-]\d+)*$',
                message='Use ranged inputs: e.g 1-8,11,121-128',
                code='invalid_bank'
            ),
        ]
    )

    tube =  models.CharField(
        "Tube",
        max_length=256,
        blank=True,
        validators=[
            RegexValidator(
                regex='^\d+([,-]\d+)*$',
                message='Use ranged inputs: e.g 1-8,11,121-128',
                code='invalid_tube'
            ),
        ]
    )

    pixel =  models.CharField(
        "Pixel",
        max_length=256,
        blank=True,
        validators=[
            RegexValidator(
                regex='^\d+([,-]\d+)*$',
                message='Use ranged inputs: e.g 1-8,11,121-128',
                code='invalid_pixel'
            ),
        ]
    )

    # Manager
    objects = MaskManager()

    class Meta:
        abstract = True
        ordering = ["id"]