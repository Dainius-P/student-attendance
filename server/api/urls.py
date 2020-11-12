from django.urls import path

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from rest_framework.urlpatterns import format_suffix_patterns

from .views import *

urlpatterns = [
    # Filtering using the URL pattern itself
    path('faculties/<int:faculty_id>/courses/<int:course_id>/teachers/<int:teacher_id>/students/<int:student_id>/', student_details),
    path('faculties/<int:faculty_id>/courses/<int:course_id>/teachers/<int:teacher_id>/students/', student_list),
    path('faculties/<int:faculty_id>/courses/<int:course_id>/teachers/<int:teacher_id>/', teacher_details),
    path('faculties/<int:faculty_id>/courses/<int:course_id>/teachers/', teacher_list),
    path('faculties/<int:faculty_id>/courses/<int:course_id>/', course_details),
    path('faculties/<int:faculty_id>/courses/', course_list),

    # Detail pages of individual endpoints
    path('students/<int:student_id>/', student_details),
    path('teachers/<int:teacher_id>/', teacher_details),
    path('courses/<int:course_id>/', course_details),
    path('faculties/<int:faculty_id>/', faculty_details),

    # List pages of individual endpoints
    path('students/', student_list),
    path('teachers/', teacher_list),
    path('courses/', course_list),
    path('faculties/', faculty_list),

    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]

urlpatterns = format_suffix_patterns(urlpatterns, allowed=['json'])