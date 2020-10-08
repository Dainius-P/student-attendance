# Generated by Django 3.1.2 on 2020-10-08 05:47

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_auto_20201008_0459'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='teachermodel',
            name='faculty',
        ),
        migrations.AddField(
            model_name='coursemodel',
            name='faculty',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='api.facultymodel'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='coursemodel',
            name='id',
            field=models.CharField(max_length=125, primary_key=True, serialize=False),
        ),
    ]