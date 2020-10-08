from django.urls import path

from rest_framework.urlpatterns import format_suffix_patterns

from .views import *

urlpatterns = [
    path('faculty/', FacultyListView.as_view(), name='faculty-list'),
    path('student/', StudentListView.as_view(), name='student-list'),
    path('teacher/', TeacherListView.as_view(), name='teacher-list'),
    path('course/', CourseListView.as_view(), name='course-list'),

    path('faculty/<str:pk>/', FacultyDetailView.as_view(), name='faculty-details'),
    path('student/<str:pk>/', StudentDetailView.as_view(), name='student-details'),
    path('teacher/<str:pk>/', TeacherDetailView.as_view(), name='teacher-details'),
	path('course/<str:pk>/', CourseDetailView.as_view(), name='course-details'),
]

urlpatterns = format_suffix_patterns(urlpatterns, allowed=['json'])