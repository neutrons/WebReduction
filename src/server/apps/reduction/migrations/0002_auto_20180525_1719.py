# Generated by Django 2.0.5 on 2018-05-25 17:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('reduction', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='regionhyspec',
            name='axis_0',
            field=models.CharField(choices=[('Q1', 'Q1'), ('Q2', 'Q2'), ('Q3', 'Q3'), ('DeltaE', 'DeltaE')], max_length=8, verbose_name='X-Axis'),
        ),
        migrations.AlterField(
            model_name='regionhyspec',
            name='axis_1',
            field=models.CharField(choices=[('Q1', 'Q1'), ('Q2', 'Q2'), ('Q3', 'Q3'), ('DeltaE', 'DeltaE')], max_length=8, verbose_name='Y-Axis'),
        ),
        migrations.AlterField(
            model_name='regionhyspec',
            name='axis_2',
            field=models.CharField(choices=[('Q1', 'Q1'), ('Q2', 'Q2'), ('Q3', 'Q3'), ('DeltaE', 'DeltaE')], max_length=8, verbose_name='Integrated Axis'),
        ),
        migrations.AlterField(
            model_name='regionhyspec',
            name='axis_3',
            field=models.CharField(choices=[('Q1', 'Q1'), ('Q2', 'Q2'), ('Q3', 'Q3'), ('DeltaE', 'DeltaE')], max_length=8, verbose_name='Integrated Axis'),
        ),
    ]