from django.contrib import admin
from .models import Property


class PropertyAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'address', 'city', 'zipcode', 'bedrooms', 'bathrooms', 'home_type', 'sqmt')
    list_display_links = ('id', 'title')
    search_fields = ('title', 'description', 'address', 'city', 'state', 'zipcode')
    list_per_page = 25


admin.site.register(Property, PropertyAdmin)
