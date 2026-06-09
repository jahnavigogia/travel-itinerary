from rest_framework import serializers

from .models import CustomUser


class CompleteProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ["id", "username", "first_name", "last_name", "gender", "profile_pic", "age", "country", "state", "city", "phone_no"]

    def validate(self, attrs):
        required_fields = ["first_name", "gender", "age", "username"]
        for field in required_fields:
            if not attrs.get(field):
                raise serializers.ValidationError(
                    {field:f"{field} is required"}
                )
        return attrs

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = [
            "username",
            "email",
            "first_name",
            "last_name",
            "phone_no",
            "age",
            "country",
            "state",
            "city",
            "gender",
            "profile_pic",
            "isProfileCompleted",
            "created_at",
            "last_login",
        ]

        read_only_fields = [
            "email",
            "created_at",
            "last_login",
            "isProfileCompleted",
        ]
