from rest_framework import serializers
from api.models import CourseModel

class CourseSerializer(serializers.ModelSerializer):
    faculty_title = serializers.CharField(source='faculty.title', required=False)

    class Meta:
        model = CourseModel
        fields = ['id', 'title', 'faculty', 'faculty_title']