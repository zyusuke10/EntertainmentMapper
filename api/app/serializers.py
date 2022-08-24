from rest_framework import serializers
from app.models import Profile, User, Spot, FavoriteSpot
class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ('id', 'name', 'email', 'message', 'created_at')
class UserSerializer(serializers.ModelSerializer):
    class Meta:
         model = User
         fields = ('id', 'name', 'email', 'password', 'created_at')
class SpotSerializer(serializers.ModelSerializer):
    class Meta:
        model = Spot
        fields = ('id', 'name', 'genre', 'address', 'phone_number', 'longitude', 'latitude', 'start_date', 'end_date', 'explanation', 'picture')
class FavoriteSpotSerializer(serializers.ModelSerializer):
    class Meta:
        model = FavoriteSpot
        fields = ('id', 'spot_id', 'user_id')