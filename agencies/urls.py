from django.urls import path
from .views import AgencyListView, AgencyView

urlpatterns = [
    path('', AgencyListView.as_view()),
    path('<pk>', AgencyView.as_view()),
]