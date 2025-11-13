from django.urls import path
from .views import (
    ListDestinationView, CreateDestinationView, UpdateDestinationView, DestinationDetailView,
    ActivityListCreateView, ActivityDetailView, UpdateActivityView
)

urlpatterns = [
    path("destinations/", ListDestinationView.as_view(), name="dest-list"),
    path("destinations/create/", CreateDestinationView.as_view()),
    path("destinations/edit/", UpdateDestinationView.as_view()),
    path("destination/delete/", DestinationDetailView.as_view()),
    path("activity/create/", ActivityListCreateView.as_view()),
    path("activity/list/", ActivityListCreateView.as_view()),
    path("activity/delete/", ActivityListCreateView.as_view()),
    path("destinations/<int:pk>/", DestinationDetailView.as_view(), name="dest-detail"),
    path("activity/detail/<int:pk>/", ActivityDetailView.as_view(), name="act-detail"),
    path("activity/update/", UpdateActivityView.as_view())
]
