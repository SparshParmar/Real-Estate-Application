from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework import permissions
from django.utils import timezone

from properties.models import Property
from .models import Listing
from .serializers import ListingSerializer, listingDetailSerializer
from datetime import datetime, timezone, timedelta
from django.contrib.auth import get_user_model

User = get_user_model()


class ListingsView(ListAPIView):
    queryset = Listing.objects.order_by('-list_date').filter(is_published=True)
    permission_classes = (permissions.AllowAny,)
    serializer_class = ListingSerializer
    lookup_field = 'slug'


class ListingView(RetrieveAPIView):
    queryset = Listing.objects.order_by('-list_date').filter(is_published=True)
    serializer_class = listingDetailSerializer
    lookup_field = 'slug'
    permission_classes = (permissions.AllowAny, )


class ListingCreate(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, format=None):
        data = self.request.data

        title = data['title']
        sale_type = data['sale_type']
        user_email = data['agency']
        description = data['description']
        price = data['price']
        open_house = data['open_house']
        photo_1 = Property.objects.get(slug='TheAdminPropSlug').photo_main
        is_published = data['is_published']
        list_date = data['list_date']
        slug = data['slug']
        prop_slug = data['_slug']
        prop_title = data['_title']

        try:
            print(".............")
            print(user_email)
            
            prop = Property.objects.get(title__iexact=prop_title)

            # print(type(prop))
            # print(type(Listing.objects.get(slug='Thehousekdafdkfj').property))
            # # fetch the selected property


            # print(type(Listing.objects.get(slug='Thehousekdafdkfj').price)) 


            listing = Listing(
                title=title, 
                property=prop, 
                sale_type=sale_type, 
                price=1000, 
                slug=slug,
                open_house=True, 
                agency=user_email, 
                list_date=Listing.objects.get(title='TheAdminListingTitle').list_date, 
                is_published=True,
                photo_1=photo_1, 
                description=description)

            listing.save(force_insert=True)
            return Response({'success': "Success"})
            
        except Exception as e:
            return Response({'error': e})


class SearchView(APIView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = ListingSerializer

    def post(self, request, format=None):
        queryset = Listing.objects.order_by('-list_date').filter(is_published=True)
        data = self.request.data

        sale_type = data['sale_type']
        queryset = queryset.filter(sale_type__iexact=sale_type)

        price = data['price']
        if price == '$0+':
            price = 0
        elif price == '$200,000+':
            price = 200000
        elif price == '$400,000+':
            price = 400000
        elif price == '$600,000+':
            price = 600000
        elif price == '$800,000+':
            price = 800000
        elif price == '$1,000,000+':
            price = 1000000
        elif price == '$1,200,000+':
            price = 1200000
        elif price == '$1,500,000+':
            price = 1500000
        elif price == 'Any':
            price = -1

        if price != -1:
            queryset = queryset.filter(price__gte=price)

        bedrooms = data['bedrooms']
        if bedrooms == '0+':
            bedrooms = 0
        elif bedrooms == '1+':
            bedrooms = 1
        elif bedrooms == '2+':
            bedrooms = 2
        elif bedrooms == '3+':
            bedrooms = 3
        elif bedrooms == '4+':
            bedrooms = 4
        elif bedrooms == '5+':
            bedrooms = 5

        queryset = queryset.filter(property__bedrooms__gte=bedrooms)

        home_type = data['home_type']
        queryset = queryset.filter(property__home_type__iexact=home_type)

        bathrooms = data['bathrooms']
        if bathrooms == '0+':
            bathrooms = 0.0
        elif bathrooms == '1+':
            bathrooms = 1.0
        elif bathrooms == '2+':
            bathrooms = 2.0
        elif bathrooms == '3+':
            bathrooms = 3.0
        elif bathrooms == '4+':
            bathrooms = 4.0

        queryset = queryset.filter(property__bathrooms__gte=bathrooms)

        sqmt = data['sqmt']
        if sqmt == '1000+':
            sqmt = 1000
        elif sqmt == '1200+':
            sqmt = 1200
        elif sqmt == '1500+':
            sqmt = 1500
        elif sqmt == '2000+':
            sqmt = 2000
        elif sqmt == 'Any':
            sqmt = 0

        if sqmt != 0:
            queryset = queryset.filter(property__sqmt__gte=sqmt)

        days_passed = data['days_listed']
        if days_passed == '1 or less':
            days_passed = 1
        elif days_passed == '2 or less':
            days_passed = 2
        elif days_passed == '5 or less':
            days_passed = 5
        elif days_passed == '10 or less':
            days_passed = 10
        elif days_passed == '20 or less':
            days_passed = 20
        elif days_passed == 'Any':
            days_passed = 0

        for query in queryset:
            num_days = (datetime.now(timezone.utc) - query.list_date).days

            if days_passed != 0:
                if num_days > days_passed:
                    slug = query.slug
                    queryset = queryset.exclude(slug__iexact=slug)

        has_photos = data['has_photos']
        if has_photos == '1+':
            has_photos = 1
        elif has_photos == '3+':
            has_photos = 3
        elif has_photos == '5+':
            has_photos = 5
        elif has_photos == '10+':
            has_photos = 10
        elif has_photos == '15+':
            has_photos = 15

        for query in queryset:
            count = 0
            if query.photo_1:
                count += 1
            if query.photo_2:
                count += 1
            if query.photo_3:
                count += 1

            if count < has_photos:
                slug = query.slug
                queryset = queryset.exclude(slug__iexact=slug)

        open_house = data['open_house']
        queryset = queryset.filter(open_house__iexact=open_house)

        keywords = data['keywords']
        # queryset = queryset.filter(description__icontains=keywords)

        serializer = ListingSerializer(queryset, many=True)

        return Response(serializer.data)
