from django.contrib import admin
from .models import *

@admin.register(FacultyModel)
class FacultyAdmin(admin.ModelAdmin):
    list_display = ('title',)
    readonly_fields=('id', 'created','updated')

@admin.register(StudentModel)
class StudentAdmin(admin.ModelAdmin):
    list_display = ('id', 'first_name', 'last_name')
    readonly_fields=('created','updated')

@admin.register(TeacherModel)
class TeacherAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name')
    readonly_fields=('created','updated')

@admin.register(CourseModel)
class CourseAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'faculty',)
    readonly_fields=('created','updated')