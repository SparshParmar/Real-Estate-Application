from rest_framework import serializers
from .models import Listing
from properties.serializers import PropertySerializer
from agencies.serializers import AgencySerializer


class ListingSerializer(serializers.ModelSerializer):
    property = PropertySerializer(read_only=True)

    class Meta:
        model = Listing
        fields = ('title', 'price', 'sale_type', 'property', 'slug')


class listingDetailSerializer(serializers.ModelSerializer):
    property = PropertySerializer(read_only=True)
    agency = AgencySerializer(read_only=True)

    class Meta:
        model = Listing
        fields = '__all__'
        lookup_field = 'slug'
