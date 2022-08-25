from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response
from app.models import Profile, User, Spot, FavoriteSpot
from app.serializers import *
from rest_framework import generics
from app import spot_distance
class ProfileListCreate(generics.ListCreateAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
class UserListCreate(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
class SpotListCreate(generics.ListCreateAPIView):
    queryset = Spot.objects.all()
    serializer_class = SpotSerializer

    def get_queryset(self):
        queryset = Spot.objects.all()
        spots = Spot.objects.all()
        genre = self.request.query_params.get('genre', None)
        place = self.request.query_params.get('place', None)
        date = self.request.query_params.get('date', None)
        keyword = self.request.query_params.get('keyword', None)
        if genre is not None:
            queryset = queryset.filter(genre__icontains=genre)
        if place is not None:
            queryset = queryset.filter(address__icontains=place)
        if date is not None:
            queryset = queryset.filter(start_date__lte=date)
            queryset = queryset.filter(end_date__gte=date)
        if keyword is not None:
            queryset = queryset.filter(explanation__icontains=keyword)
        if queryset is None:
            raise ValidationError('No matching spot found')
        return queryset

class FavoriteSpotListCreate(generics.ListCreateAPIView):
    queryset = FavoriteSpot.objects.all()
    serializer_class = FavoriteSpotSerializer
class NearBySpotListCreate(generics.ListCreateAPIView):
    queryset = spot_distance.SearchNearBySpot(Spot.objects.all())
    serializer_class = SpotSerializer