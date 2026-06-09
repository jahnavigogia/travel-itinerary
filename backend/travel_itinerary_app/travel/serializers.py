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


class DestinationSerializer(serializers.ModelSerializer):
    activities = ActivitySerializer(many=True, read_only=True)

    class Meta:
        model = Destination
        fields = ["arrival_date", "departure_date", "name", "activities"]

    def validate(self, data):
        arrival_date =data.get("arrival_date")
        departure_date = data.get("departure_date")
        if (arrival_date and departure_date and arrival_date > departure_date):
            raise serializers.ValidationError("Destination start date must be on or before end date.")
        return data
