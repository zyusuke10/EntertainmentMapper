from django.urls import path
from . import views
from rest_framework_jwt.views import obtain_jwt_token
from .views import AuthRegister
from django.conf.urls import include, url
from rest_framework import routers

urlpatterns = [
    path('api/profile/', views.ProfileListCreate.as_view() ),
    path('api/user/', views.UserListCreate.as_view() ),
    path('api/spot_search/', views.SpotListCreate.as_view() ),
    path('api/favorite_spot/', views.FavoriteSpotListCreate.as_view() ),
    url(r'^login/', obtain_jwt_token),
]