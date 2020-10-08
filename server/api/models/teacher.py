from .faculty import FacultyModel

from django.db import models

import uuid

class TeacherModel(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    first_name = models.CharField(max_length=125)
    last_name = models.CharField(max_length=125)

    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

    class Meta:
        verbose_name_plural = "Teachers"
        verbose_name = "Teacher"