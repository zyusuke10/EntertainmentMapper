from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response
from app.models import Profile, User, Spot, FavoriteSpot
from app.serializers import *
from rest_framework import generics
from django.db.models import Q

from django.contrib.auth import authenticate
from django.db import transaction
from django.http import HttpResponse, Http404
from rest_framework import authentication, permissions, generics
from rest_framework_jwt.settings import api_settings
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.response import Response
from rest_framework import status, viewsets, filters
from rest_framework.views import APIView
from .serializers import UserSerializer

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

# ユーザ作成のView(POST)
class AuthRegister(generics.CreateAPIView):
    permission_classes = (permissions.AllowAny,)
    queryset = User.objects.all()
    serializer_class = UserSerializer

    @transaction.atomic
    def post(self, request, format=None):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)