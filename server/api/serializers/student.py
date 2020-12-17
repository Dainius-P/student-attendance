from rest_framework import serializers
from .teacher import TeacherSerializer

from api.models import StudentModel

class StudentSerializer(serializers.ModelSerializer):
    teacher_list = TeacherSerializer(source="teachers", read_only=True, many=True, required=False)

    class Meta:
        model = StudentModel
        fields = ['id', 'first_name', 'last_name', 'teachers', 'teacher_list']