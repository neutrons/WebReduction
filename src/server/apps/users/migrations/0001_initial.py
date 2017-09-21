# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2017-09-18 17:32
from __future__ import unicode_literals

from django.conf import settings
import django.contrib.auth.models
from django.db import migrations, models
import django.db.models.deletion
import smart_selects.db_fields


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0001_initial'),
        ('catalog', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('username', models.CharField(db_index=True, max_length=40, unique=True)),
                ('email', models.EmailField(blank=True, max_length=100)),
                ('fullname', models.CharField(max_length=100, verbose_name='Full Name')),
                ('address', models.CharField(max_length=250)),
                ('date_joined', models.DateField(auto_now=True)),
                ('is_staff', models.BooleanField(default=False)),
                ('is_active', models.BooleanField(default=True)),
                ('is_superuser', models.BooleanField(default=False)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.Group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.Permission', verbose_name='user permissions')),
            ],
            options={
                'abstract': False,
            },
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name='UserProfile',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('home_institution', models.CharField(blank=True, max_length=200)),
                ('ipts', models.CharField(blank=True, max_length=20)),
                ('experiment', models.CharField(blank=True, max_length=20)),
                ('facility', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='catalog.Facility')),
                ('instrument', smart_selects.db_fields.ChainedForeignKey(chained_field='facility', chained_model_field='facility', on_delete=django.db.models.deletion.CASCADE, to='catalog.Instrument')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='profile', related_query_name='profile', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Profile',
            },
        ),
    ]
