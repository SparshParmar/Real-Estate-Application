from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework import permissions
from .models import Property
from .serializers import PropertySerializer, PropertyDetailSerializer


class PropertiesView(ListAPIView):
    queryset = Property.objects.order_by('+title')
    serializer_class = PropertySerializer
    lookup_field = 'slug'


class PropertyView(RetrieveAPIView):
    queryset = Property.objects.order_by('+title')
    serializer_class = PropertyDetailSerializer
    permission_classes = (permissions.IsAuthenticated,)
    lookup_field = 'slug'

