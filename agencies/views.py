from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework import permissions
from .models import Agency
from .serializers import AgencySerializer


class AgencyListView(ListAPIView):
    permission_classes = (permissions.AllowAny, )
    queryset = Agency.objects.all()
    serializer_class = AgencySerializer
    pagination_class = None


class AgencyView(RetrieveAPIView):
    queryset = Agency.objects.all()
    serializer_class = AgencySerializer