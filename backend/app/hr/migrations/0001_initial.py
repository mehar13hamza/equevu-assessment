# Generated by Django 3.2.19 on 2023-05-18 08:45

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Department',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Candidate',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('full_name', models.CharField(max_length=100)),
                ('date_of_birth', models.DateField()),
                ('years_of_experience', models.IntegerField()),
                ('resume', models.FileField(upload_to='resumes/')),
                ('department', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='hr.department')),
            ],
        ),
    ]
