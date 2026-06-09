from django.contrib import admin
from django.contrib.admin import ModelAdmin
from .models import CustomUser

@admin.register(CustomUser)
class Users(ModelAdmin):
    list_display = ("id", "phone_no", 'email', "first_name", "last_name", "phone_no", "age", "country", "gender", "last_login", "created_at")
    search_fields = ["phone_no", "email"]
    ordering = ["-created_at"]
    