from django.urls import path
from .views import PropertiesView, PropertyView

urlpatterns = [
    path('', PropertiesView.as_view()),
    path('<slug>', PropertyView.as_view()),
]
