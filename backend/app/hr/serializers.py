from rest_framework import serializers
from django.core.exceptions import ValidationError
from .models import Candidate


class CandidateRegistrationSerializer(serializers.ModelSerializer):
    resume = serializers.FileField(write_only=True)

    class Meta:
        model = Candidate
        fields = (
            'id',
            'full_name',
            'date_of_birth',
            'years_of_experience',
            'department',
            'resume'
        )

    def validate_resume(self, value):
        allowed_formats = ['pdf', 'docx']
        file_extension = value.name.split('.')[-1].lower()

        if file_extension not in allowed_formats:
            raise ValidationError(f"Only PDF and DOCX files are allowed. "
                                  f"Invalid file format: {file_extension}")

        return value

    def create(self, validated_data):
        resume_file = validated_data.pop('resume', None)
        full_name = validated_data.get('full_name')
        candidate = Candidate.objects.create(**validated_data)
        if resume_file:
            file_extension = resume_file.name.split('.')[-1].lower()
            resume_filename = f"{candidate.id}_" \
                              f"{full_name.replace(' ', '_')}_resume." \
                              f"{file_extension}"
            candidate.resume.save(resume_filename, resume_file)
        return candidate


class CandidateSerializer(serializers.ModelSerializer):
    resume = serializers.FileField(write_only=True)
    department = serializers.StringRelatedField()

    class Meta:
        model = Candidate
        fields = (
            'id',
            'full_name',
            'date_of_birth',
            'years_of_experience',
            'department',
            'resume'
        )
