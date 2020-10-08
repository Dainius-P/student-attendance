from rest_framework import serializers
from api.models import CourseModel

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseModel
        fields = ['id', 'title', 'teachers']