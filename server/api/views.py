from django.http import Http404

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import generics
from rest_framework import status

from api.models import *
from api.serializers import *
from api.permissions import CustomPermissions

import uuid

def get_object(model, pk):
    try:
        return model.objects.get(pk=pk)
    except model.DoesNotExist:
        raise Http404

def create_object(serializer, request):
    ser = serializer(data=request.data)
    if ser.is_valid():
        ser.save()
        return Response(ser.data, status=status.HTTP_201_CREATED)
    return Response(ser.errors, status=status.HTTP_400_BAD_REQUEST)

def update_object(serializer, object_, request):
    ser = serializer(object_, data=request.data)
    if ser.is_valid():
        ser.save()
        return Response(ser.data)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([CustomPermissions])
def student_details(request, student_id, faculty_id=None, course_id=None, teacher_id=None, format=None):
    student = get_object(StudentModel, course_id)

    if request.method == 'GET':
        serializer = StudentSerializer(student)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = StudentSerializer(student, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        student.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET', 'POST'])
@permission_classes([CustomPermissions])
def student_list(request, faculty_id=None, course_id=None, teacher_id=None, format=None):
    if request.method == 'POST':
        return create_object(StudentSerializer, request)
    elif request.method == 'GET':
        students = StudentModel.objects.all()

        if teacher_id is not None:
            students = students.filter(teachers__pk=teacher_id)
        if course_id is not None:
            students = students.filter(teachers__courses__pk=course_id)
        if faculty_id is not None:
            students = students.filter(teachers__courses__faculty__pk=faculty_id)
        
        serializer = StudentSerializer(students, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([CustomPermissions])
def teacher_details(request, teacher_id, faculty_id=None, course_id=None, format=None):
    teacher = get_object(TeacherModel, teacher_id)
    if request.method == 'GET':
        serializer = TeacherSerializer(teacher)
        return Response(serializer.data)
    elif request.method == 'PUT':
        return update_object(TeacherSerializer, teacher, request)
    elif request.method == 'DELETE':
        teacher.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET', 'POST'])
@permission_classes([CustomPermissions])
def teacher_list(request, faculty_id=None, course_id=None, format=None):
    if request.method == 'POST':
        return create_object(TeacherSerializer, request)
    elif request.method == 'GET':
        teachers = TeacherModel.objects.all()
        if faculty_id is not None:
            teachers = teachers.filter(courses__faculty__pk=faculty_id)
        if course_id is not None:
            teachers = teachers.filter(courses__pk=course_id)

        serializer = TeacherSerializer(teachers, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([CustomPermissions])
def course_details(request, course_id, faculty_id=None, format=None):
    course = get_object(CourseModel, course_id)

    if request.method == 'GET':
        serializer = CourseSerializer(course)
        return Response(serializer.data)
    elif request.method == 'PUT':
        return update_object(CourseSerializer, course, request)
    elif request.method == 'DELETE':
        course.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET', 'POST'])
@permission_classes([CustomPermissions])
def course_list(request, faculty_id=None, format=None):
    if request.method == 'POST':
        return create_object(CourseSerializer, request)
    elif request.method == 'GET':
        courses = CourseModel.objects.all()
        if faculty_id is not None:
            courses = courses.filter(faculty__pk=faculty_id)

        serializer = CourseSerializer(courses, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([CustomPermissions])
def faculty_details(request, faculty_id, format=None):
    faculty = get_object(FacultyModel, faculty_id)

    if request.method == 'GET':
        serializer = FacultySerializer(faculty)
        return Response(serializer.data)
    elif request.method == 'PUT':
        return update_object(FacultySerializer, faculty, request)
    elif request.method == 'DELETE':
        faculty.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET', 'POST'])
@permission_classes([CustomPermissions])
def faculty_list(request, format=None):
    if request.method == 'POST':
        return create_object(FacultySerializer, request)
    elif request.method == 'GET':
        faculties = FacultyModel.objects.all()
        serializer = FacultySerializer(faculties, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)