from rest_framework import serializers
from .course import CourseSerializer

from api.models import TeacherModel

class TeacherSerializer(serializers.ModelSerializer):
    course_list = CourseSerializer(source="courses", read_only=True, many=True, required=False)

    class Meta:
        model = TeacherModel
        fields = ['id', 'first_name', 'last_name', 'courses', 'course_list']