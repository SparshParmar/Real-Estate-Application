from django.db import models
from django.contrib.auth import get_user_model
User = get_user_model()


# Create your models here.
class Property(models.Model):
    class HomeType(models.TextChoices):
        HOUSE = 'House'
        CONDO = 'Condo'
        TOWNHOUSE = 'Townhouse'
        COOP = 'Co-op'

    title = models.CharField(max_length=50)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    photo_main = models.ImageField(upload_to='photos/%Y/%m/%d/')
    address = models.CharField(max_length=150)
    city = models.CharField(max_length=100)
    zipcode = models.CharField(max_length=15)
    bedrooms = models.IntegerField()
    bathrooms = models.DecimalField(max_digits=2, decimal_places=1)
    home_type = models.CharField(max_length=50, choices=HomeType.choices, default=HomeType.HOUSE)
    sqmt = models.IntegerField()
    slug = models.CharField(max_length=50)

    def __str__(self):
        return self.title
