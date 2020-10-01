from rest_framework import serializers
from api.models import FacultyModel

class FacultySerializer(serializers.ModelSerializer):
    class Meta:
        model = FacultyModel
        fields = ['id', 'title']