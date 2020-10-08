from .course import CourseModel

from django.db import models

import uuid

class StudentModel(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    first_name = models.CharField(max_length=125)
    last_name = models.CharField(max_length=125)
    courses = models.ManyToManyField(CourseModel)

    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.first_name

    class Meta:
        verbose_name_plural = "Students"
        verbose_name = "Student"