from django.urls import path
from . import views
urlpatterns = [
    path('api/profile/', views.ProfileListCreate.as_view() ),
    path('api/user/', views.UserListCreate.as_view() ),
    path('api/spot_search/', views.SpotListCreate.as_view() ),
    path('api/favorite_spot/', views.FavoriteSpotListCreate.as_view() ),
]