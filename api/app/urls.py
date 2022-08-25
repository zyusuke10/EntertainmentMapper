from django.urls import path
from . import views
from django.conf.urls import include, url
from rest_framework import routers
from app.views import CreateUserView

urlpatterns = [
    path('api/profile/', views.ProfileListCreate.as_view() ),
    path('api/user/', views.UserListCreate.as_view() ),
    path('api/spot_search/', views.SpotListCreate.as_view() ),
    path('api/nearby_spot/', views.NearBySpotListCreate.as_view() ),
    path('api/favorite_spot/create/', views.FavoriteSpotListCreate.as_view() ),
    path('api/favorite_spot/index/', views.FavoriteSpotListIndex.as_view() ),
    path('register/', CreateUserView.as_view(), name='register'),  # 追加
    path('auth/', include('djoser.urls.jwt')),  # 追加 
]