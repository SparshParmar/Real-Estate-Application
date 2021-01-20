from django.urls import path
from .views import PropertiesView, PropertyView

urlpatterns = [
    path('dashboard/properties', PropertiesView.as_view()),
    path('dashboard/propterties/<slug>', PropertyView.as_view()),
]
