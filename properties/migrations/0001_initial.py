# Generated by Django 3.0.4 on 2021-01-21 08:32

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Property',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=50)),
                ('photo_main', models.ImageField(upload_to='photos/%Y/%m/%d/')),
                ('address', models.CharField(max_length=150)),
                ('city', models.CharField(max_length=100)),
                ('zipcode', models.CharField(max_length=15)),
                ('bedrooms', models.IntegerField()),
                ('bathrooms', models.DecimalField(decimal_places=1, max_digits=2)),
                ('home_type', models.CharField(choices=[('House', 'House'), ('Condo', 'Condo'), ('Townhouse', 'Townhouse'), ('Co-op', 'Coop')], default='House', max_length=50)),
                ('sqmt', models.IntegerField()),
                ('slug', models.CharField(max_length=50)),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
