from django.http import Http404

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework import status

from api.models import FacultyModel
from api.serializers import FacultySerializer

import uuid

class FacultyDetailView(APIView):

    # Manipulate a particulare faculty: get, create, delete

    def get_object(self, pk):
        try:
            return FacultyModel.objects.get(pk=uuid.UUID(pk))
        except:
            raise Http404

    def get(self, request, pk, format=None):
        faculty = self.get_object(pk)
        serializer = FacultySerializer(faculty)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        faculty = self.get_object(pk)
        serializer = FacultySerializer(faculty, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        faculty = self.get_object(pk)
        faculty.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class FacultyListView(generics.ListCreateAPIView):
    queryset = FacultyModel.objects.all()
    serializer_class = FacultySerializer