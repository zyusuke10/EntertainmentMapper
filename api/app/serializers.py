from rest_framework import serializers
from .models import Profile, Spot, FavoriteSpot, RequestSpot, GenreType, SpotType
from django.contrib.auth import update_session_auth_hash
from rest_framework import serializers
from django.contrib.auth.models import User


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ('id', 'name', 'email', 'message', 'created_at')
"""class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'name', 'email', 'password', 'created_at')"""
class SpotSerializer(serializers.ModelSerializer):
    class Meta:
        model = Spot
        fields = ('id', 'name', 'genre', 'address', 'phone_number', 'longitude', 'latitude', 'start_date', 'end_date', 'explanation', 'picture')
class FavoriteSpotSerializer(serializers.ModelSerializer):
    class Meta:
        model = FavoriteSpot
        fields = ('id', 'spot_id', 'user_id')

    spot_id = serializers.IntegerField()
    user_id = serializers.IntegerField()
    def create(self, validated_data):
        return FavoriteSpot.objects.create(**validated_data)
        
class RequestSpotSerializer(serializers.Serializer):
    genre = serializers.ChoiceField(choices=GenreType.choices, required=False)
    place = serializers.ChoiceField(choices=SpotType.choices, required=False)
    date = serializers.DateField()
    keyword = serializers.CharField()

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id', 'username', 'password')
        extra_kwargs = {'password': {'write_only': True, 'required': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
