from rest_framework import serializers
from .models import Property


class PropertySerializer(serializers.ModelSerializer):
    class Meta:
        model = Property
        fields = ('title', 'owner', 'address', 'city', 'zipcode', 'bedrooms', 'bathrooms', 'home_type',
                  'sqmt', 'slug')


class PropertyDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Property
        fields = '__all__'
        lookup_field = 'slug'
