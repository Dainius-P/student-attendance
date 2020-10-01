from django.urls import path

from rest_framework.urlpatterns import format_suffix_patterns

from .views import *

urlpatterns = [
    path('faculty/', FacultyListView.as_view(), name='faculty-list'),
    path('faculty/<str:pk>/', FacultyDetailView.as_view(), name='faculty-details'),
]

urlpatterns = format_suffix_patterns(urlpatterns, allowed=['json'])