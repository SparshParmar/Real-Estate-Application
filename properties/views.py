from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework import permissions
from .models import Property
from .serializers import PropertySerializer, PropertyDetailSerializer
from django.contrib.auth import get_user_model
User = get_user_model()


class PropertiesView(ListAPIView):
    queryset = Property.objects.order_by('+title')
    serializer_class = PropertySerializer
    lookup_field = 'slug'


class PropertyView(RetrieveAPIView):
    queryset = Property.objects.order_by('+title')
    serializer_class = PropertyDetailSerializer
    permission_classes = (permissions.IsAuthenticated,)
    lookup_field = 'slug'


class PropertyCreate(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, format=None):
        data = self.request.data

        title = data['_title']
        user_email = data['_owner']
        photo_main = data['_photo_1']
        address = data['_address']
        city = data['_city']
        zipcode = int(data['_zipcode'])
        if zipcode < 0:
            return Response({'error': 'Zipcode must be positive'})
        bedrooms = int(data['_bedrooms'])
        if bedrooms < 0:
            return Response({'error': 'Number of bathrooms'})
        bathrooms = float(data['_bathrooms'])
        if bathrooms < 0:
            return Response({'error': 'Number of bathrooms cannot be negative'})
        home_type = data['_home_type']
        sqmt = int(data['_sqmt'])
        if sqmt <= 0:
            return Response({'error': 'sqmt must be greater than 0'})
        slug = data['_slug']

        try:
            owner_user = User.objects.get(email=user_email)

            prop = Property(title=title, owner=str(owner_user), photo_main=photo_main, address=address,
                            city=city, zipcode=zipcode, home_type=home_type, bedrooms=bedrooms, bathrooms=bathrooms,
                            sqmt=sqmt, slug=slug)

            prop.save()

            return Response({'success': 'Property created successfully'})
        except:
            return Response({'error': 'Property creation failed'})
