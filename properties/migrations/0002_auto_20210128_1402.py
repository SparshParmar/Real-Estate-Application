# Generated by Django 3.0.4 on 2021-01-28 13:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('properties', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='property',
            name='owner',
            field=models.CharField(default='mike@gmail.com', max_length=100),
        ),
    ]
