from rest_framework import serializers
from api.models import TeacherModel

class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeacherModel
        fields = ['id', 'first_name', 'last_name', 'faculty']