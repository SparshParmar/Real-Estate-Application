from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework import permissions
from .models import Property
from .serializers import PropertySerializer, PropertyDetailSerializer
from django.contrib.auth import get_user_model
from PIL import Image
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
        
        photo_main = Property.objects.get(slug='TheAdminPropSlug').photo_main
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

            print('****************')
            print(type(owner_user))
            # print(type(Property.objects.get(slug='thephoebeshouse').owner))

            print('****************')
            print(type(photo_main))
            # print(type(Property.objects.get(slug='thephoebeshouse').photo_main))

            
            # owner_user.property_set.create(title=title, photo_main=photo_main, address=address,
            #         city=city, zipcode=zipcode, home_type=home_type, bedrooms=bedrooms, bathrooms=bathrooms,
            #              sqmt=sqmt, slug=slug)
            # print(user_email)
            # print("cjeck herer")
            # print(title, owner_user, photo_main, address, city, zipcode, bedrooms, bathrooms, home_type, sqmt,slug )
            prop = Property(title=title, photo_main=photo_main, address=address,
                            city=city, 
                            owner=owner_user,
                            zipcode=zipcode, home_type=home_type, bedrooms=bedrooms, bathrooms=bathrooms,
                            sqmt=sqmt, slug=slug)

            

            # prop = Property()                
            # print(type(Property.owner))
            prop.save(force_insert=True)

            return Response({'success': 'Property created successfully'})
        except Exception as e:
            return Response({'error': e})
