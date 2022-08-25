from django.db import models
import datetime
from django.utils import timezone

class Profile(models.Model):
    name = models.CharField(max_length=64)
    email = models.EmailField()
    message = models.CharField(max_length=256)
    created_at = models.DateTimeField(auto_now_add=True)

class SpotType(models.TextChoices):
    TOKYO = 'TOKYO', 'Tokyo'
    KANAGAWA = 'KANAGAWA', 'Kanagawa'

class GenreType(models.TextChoices):
    EVENT = 'EVENT', 'Event'
    TRIP = 'TRIP', 'Trip'

class RequestSpot(models.Model):
    genre = models.CharField(max_length=64, choices=GenreType.choices)
    place = models.CharField(max_length=16, choices=SpotType.choices)
    date = models.DateField()
    keyword = models.CharField(max_length=16)

class User(models.Model):
    name = models.CharField(max_length=64)
    email = models.EmailField()
    password = models.CharField(max_length=256)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def create_user(self, request_data, **kwargs):
        now = timezone.now()
        if not request_data['email']:
            raise ValueError('Users must have an email address.')

        profile = ""
        if request_data.get('profile'):
            profile = request_data['profile']

        user = self.model(
            name=request_data['username'],
            email=self.normalize_email(request_data['email']),
            date_joined=now,
            password=request_data['password'],
            created_at=now
        )

        #user.set_password(request_data['password'])
        user.save(using=self._db)
        return user

class Spot(models.Model):
    name = models.CharField(max_length=64)
    genre = models.CharField(max_length=64)
    address = models.CharField(max_length=128)
    phone_number = models.CharField(max_length=12)
    longitude = models.FloatField()
    latitude = models.FloatField()
    start_date = models.DateField()
    end_date = models.DateField()
    explanation = models.TextField()
    picture = models.URLField()

class FavoriteSpot(models.Model):
    spot_id = models.PositiveIntegerField()
    user_id = models.PositiveIntegerField()

