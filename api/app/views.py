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
    queryset = Spot.objects.all()
    serializer_class = SpotSerializer
def AddFavoriteSpot(request):
    user = next(filter(lambda u: u.id == request.GET['user_id'], User.objects.all())), None
    spot = next(filter(lambda s: s.id == request.GET['spot_id'], Spot.objects.all())), None
    favorite_spot = FavoriteSpot(user.id, spot.id)
    if favorite_spot in FavoriteSpot.objects.all():
        return
    favorite_spot.save

