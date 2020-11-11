# Generated by Django 3.1.2 on 2020-11-11 13:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_auto_20201111_1353'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='teachermodel',
            name='courses',
        ),
        migrations.AddField(
            model_name='coursemodel',
            name='teachers',
            field=models.ManyToManyField(to='api.TeacherModel'),
        ),
    ]