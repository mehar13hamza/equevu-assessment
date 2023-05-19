from django.db import models


class Department(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Candidate(models.Model):
    full_name = models.CharField(max_length=100)
    date_of_birth = models.DateField(null=False)
    years_of_experience = models.IntegerField()
    department = models.ForeignKey(Department, on_delete=models.CASCADE)
    resume = models.FileField(upload_to='resumes/')

    def __str__(self):
        return self.full_name
