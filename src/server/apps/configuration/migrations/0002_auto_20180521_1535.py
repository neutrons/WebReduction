# Generated by Django 2.0.4 on 2018-05-21 19:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('configuration', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='configurationhyspec',
            name='e_max_fraction',
            field=models.DecimalField(blank=True, decimal_places=2, help_text='Maximum of energy fraction.', max_digits=4, null=True, verbose_name='\\( E_{max} \\) fraction'),
        ),
        migrations.AlterField(
            model_name='configurationhyspec',
            name='e_min_fraction',
            field=models.DecimalField(blank=True, decimal_places=2, help_text='Minimum energy fraction.', max_digits=4, null=True, verbose_name='\\( E_{min} \\) fraction'),
        ),
        migrations.AlterField(
            model_name='configurationhyspec',
            name='e_step',
            field=models.DecimalField(blank=True, decimal_places=2, help_text='Energy step in meV.', max_digits=4, null=True, verbose_name='\\( E_{step} \\) (meV)'),
        ),
    ]
