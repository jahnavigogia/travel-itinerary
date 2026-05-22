from rest_framework import serializers
from .models import Destination, Activity

class ActivitySerializer(serializers.Serializer):
    class Meta:
        model = Activity
        fields = "__all__"

    def validate(self, data):
        if not (data["destination"].start_date <= data["date"] <= data["destination"].end_date):
            raise serializers.ValidationError("Activity date must fall within its destination period.")
        return data


class DestinationSerializer(serializers.Serializer):
    activities = ActivitySerializer(many=True, read_only=True)

    class Meta:
        model = Destination
        fields = "__all__"

    def validate(self, data):
        if data["start_date"] > data["end_date"]:
            raise serializers.ValidationError("Destination start_date must be on or before end_date.")
        return data
