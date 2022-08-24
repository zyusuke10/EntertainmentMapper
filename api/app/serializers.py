from rest_framework import serializers
from app.models import Profile, Spot
class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ('id', 'name', 'email', 'message', 'created_at')

class SpotSerializer(serializers.ModelSerializer):
    class Meta:
        model = Spot
        fields = ('id', 'name', 'genre', 'address', 'phone_number', 'longitude', 'latitude', 'start_date', 'end_date', 'explanation', 'picture', 'created_at')