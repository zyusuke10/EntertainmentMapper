from app.models import Profile, User, Spot, FavoriteSpot
from app.serializers import ProfileSerializer, UserSerializer, SpotSerializer, FavoriteSpotSerializer
from rest_framework import generics
class ProfileListCreate(generics.ListCreateAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
class UserListCreate(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
class SpotListCreate(generics.ListCreateAPIView):
    queryset = Spot.objects.all()
    serializer_class = SpotSerializer
class FavoriteSpotListCreate(generics.ListCreateAPIView):
    queryset = FavoriteSpot.objects.all()
    serializer_class = FavoriteSpotSerializer
