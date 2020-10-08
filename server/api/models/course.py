from .teacher import TeacherModel
from .faculty import FacultyModel

from django.db import models

import uuid

class CourseModel(models.Model):
    id = models.CharField(max_length=125, primary_key=True)

    title = models.CharField(max_length=125)

    teachers = models.ManyToManyField(TeacherModel)
    faculty = models.ForeignKey(FacultyModel, on_delete=models.CASCADE)

    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name_plural = "Courses"
        verbose_name = "Course"