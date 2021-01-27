from django.db import models
from django.utils.timezone import now
from agencies.models import Agency
from properties.models import Property



class Listing(models.Model):
    class SaleType(models.TextChoices):
        FOR_SALE = 'For Sale'
        FOR_RENT = 'For Rent'

    agency = models.CharField(max_length=100)
    property = models.ForeignKey(Property, on_delete=models.CASCADE)
    slug = models.CharField(max_length=200, unique=True)
    title = models.CharField(max_length=150)
    description = models.TextField(blank=True)
    sale_type = models.CharField(max_length=50, choices=SaleType.choices, default=SaleType.FOR_SALE)
    price = models.IntegerField()
    open_house = models.BooleanField(default=False)
    photo_1 = models.ImageField(upload_to='photos/%Y/%m/%d/', blank=True)
    photo_2 = models.ImageField(upload_to='photos/%Y/%m/%d/', blank=True)
    photo_3 = models.ImageField(upload_to='photos/%Y/%m/%d/', blank=True)
    is_published = models.BooleanField(default=True)
    list_date = models.DateTimeField(default=now, blank=True)

    def __str__(self):
        return self.title

