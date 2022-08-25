from rest_framework import serializers
from .models import Profile, User, Spot, FavoriteSpot, RequestSpot, GenreType, SpotType
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
    spot_id = serializers.IntegerField()
    user_id = serializers.IntegerField()
    def create(self, user_id, spot_id):
        return FavoriteSpot.objects.create(user_id, spot_id)
class RequestSpotSerializer(serializers.Serializer):
    genre = serializers.ChoiceField(choices=GenreType.choices, required=False)
    place = serializers.ChoiceField(choices=SpotType.choices, required=False)
    date = serializers.DateField()
    keyword = serializers.CharField()
