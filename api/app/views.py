from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response
from app.models import Profile, User, Spot, FavoriteSpot
from app.serializers import *
from rest_framework import generics
from app import spot_distance
from django.db import models

from rest_framework import generics
from .serializers import UserSerializer
from rest_framework.permissions import AllowAny


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
        favorite_spots = FavoriteSpot.objects.all()
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
        response = []
        # s.user_id = 1 は1のところにフロントから取ってきたuser_idが入る予定
        user_favorite_spots = filter(lambda s: s.user_id==1, FavoriteSpot.objects.all())
        for f_spot in user_favorite_spots:
            for spot in queryset:
                if f_spot.spot_id == spot.id:
                    spot.isfavorite = 1
                else:
                    spot.isfavorite = 0
                response.append(spot)
        return response

# <class 'app.models.Spot'>

class FavoriteSpotListCreate(generics.ListCreateAPIView):
    queryset = FavoriteSpot.objects.all()
    serializer_class = FavoriteSpotSerializer
    def AddFavoriteSpot(self, request):
        # user = next(filter(lambda u: u.id == request.GET['user_id'], User.objects.all())), None
        # spot = next(filter(lambda s: s.id == request.GET['spot_id'], Spot.objects.all())), None
        # favorite_spot = FavoriteSpotSerializer(user.id, spot.id)
        favorite_spot = FavoriteSpotSerializer(data=request.data)
        if favorite_spot.is_valid():
            favorite_spot.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CreateUserView(generics.CreateAPIView):
    serializer_class = UserSerializer
    permission_classes = (AllowAny,)

class NearBySpotListCreate(generics.ListCreateAPIView):
    queryset = spot_distance.SearchNearBySpot(Spot.objects.all())
    serializer_class = SpotSerializer

class FavoriteSpotListIndex(generics.ListCreateAPIView):
    serializer_class = SpotSerializer
    def get_queryset(self):
        user_favorite_spots = filter(lambda s: s.user_id == self.request.query_params.get('user_id', None), FavoriteSpot.objects.all())
        all_spots = Spot.objects.all()
        queryset = []
        for f_spot in user_favorite_spots:
            spot = next(filter(lambda s:s.id == f_spot.spot_id, all_spots))
            queryset.append(spot)
        return queryset
