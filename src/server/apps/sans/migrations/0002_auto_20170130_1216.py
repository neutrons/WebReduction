# -*- coding: utf-8 -*-
# Generated by Django 1.10.5 on 2017-01-30 17:16
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('catalog', '0001_initial'),
        ('django_remote_submission', '0001_initial'),
        ('sans', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='gpsansreduction',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='gpsansreduction_users', related_query_name='gpsansreduction_user', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='gpsansconfiguration',
            name='instrument',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='gpsansconfiguration_instruments', related_query_name='gpsansconfiguration_instrument', to='catalog.Instrument'),
        ),
        migrations.AddField(
            model_name='gpsansconfiguration',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='gpsansconfiguration_users', related_query_name='gpsansconfiguration_user', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='biosansregion',
            name='configuration',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='regions', related_query_name='region', to='sans.BioSANSConfiguration'),
        ),
        migrations.AddField(
            model_name='biosansregion',
            name='reduction',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='regions', related_query_name='region', to='sans.BioSANSReduction'),
        ),
        migrations.AddField(
            model_name='biosansreduction',
            name='instrument',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='biosansreduction_instruments', related_query_name='biosansreduction_instrument', to='catalog.Instrument'),
        ),
        migrations.AddField(
            model_name='biosansreduction',
            name='script_interpreter',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='biosansreduction_interpreters', related_query_name='biosansreduction_interpreter', to='django_remote_submission.Interpreter'),
        ),
        migrations.AddField(
            model_name='biosansreduction',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='biosansreduction_users', related_query_name='biosansreduction_user', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='biosansconfiguration',
            name='instrument',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='biosansconfiguration_instruments', related_query_name='biosansconfiguration_instrument', to='catalog.Instrument'),
        ),
        migrations.AddField(
            model_name='biosansconfiguration',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='biosansconfiguration_users', related_query_name='biosansconfiguration_user', to=settings.AUTH_USER_MODEL),
        ),
    ]
