from django.db import models

class FacultyModel(models.Model):
    title = models.CharField(max_length=125)

    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name_plural = "Faculties"
        verbose_name = "Faculty"