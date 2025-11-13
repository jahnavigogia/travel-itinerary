from django.contrib import admin
from .models import Destination, Activity, StayPlaces
from django.contrib.admin import ModelAdmin


@admin.register(Destination)
class Destination(ModelAdmin):
    list_display = ("id", "name", "image", "arrival_date", "departure_date")
    search_fields = ["name", "arrival_date"]
    ordering = ["-created_at"]
    
@admin.register(Activity)
class Activity(ModelAdmin):
    list_display = ("id", "destination", "name", "date", "image", "start_time", "end_time")
    search_fields = ["name"]
    ordering = ["~start_time"]

@admin.register(StayPlaces)
class StayPlaces(ModelAdmin):
    list_display = ("id", "destination", "place_name", "check_in", "check_out")
    search_fields = ["place_name"]
    ordering = ["~check_in"]
