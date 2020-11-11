from .teacher import TeacherModel

from django.db import models

class StudentModel(models.Model):
    first_name = models.CharField(max_length=125)
    last_name = models.CharField(max_length=125)

    teachers = models.ManyToManyField(TeacherModel)

    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.first_name

    class Meta:
        verbose_name_plural = "Students"
        verbose_name = "Student"