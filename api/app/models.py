from django.db import models

class Profile(models.Model):
    name = models.CharField(max_length=64)
    email = models.EmailField()
    message = models.CharField(max_length=256)
    created_at = models.DateTimeField(auto_now_add=True)

class User(models.Model):
    name = models.CharField(max_length=64)
    email = models.EmailField()
    password = models.CharField(max_length=256)
    created_at = models.DateTimeField(auto_now_add=True)

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


