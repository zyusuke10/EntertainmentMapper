from django.urls import path
from . import views
urlpatterns = [
    path('api/spot_search/', views.SpotListCreate.as_view() ),
]