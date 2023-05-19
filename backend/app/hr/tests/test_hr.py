from django.urls import reverse
from django.core.files.uploadedfile import SimpleUploadedFile
from rest_framework.test import APITestCase
from rest_framework import status
from hr.models import Department, Candidate


class CandidateAPITestCase(APITestCase):
    def setUp(self):
        # Create a department
        self.department = Department.objects.create(name='Department 1')

        # Create a candidate
        self.candidate = Candidate.objects.create(
            full_name='John Doe',
            date_of_birth='1990-01-01',
            years_of_experience=5,
            department=self.department,
            resume=SimpleUploadedFile(
                name='resume.pdf',
                content=b'Test Resume Content',
                content_type='application/pdf'
            )
        )

        # Set up the API URLs
        self.apis_list_url = reverse('api-endpoints')
        self.candidate_registration_url = reverse('candidate-registration')
        self.applicant_list_url = reverse('applicant-list')
        self.resume_download_url = reverse('resume-download',
                                           args=[self.candidate.id])

    def test_apis_list(self):
        response = self.client.get(self.apis_list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_candidate_registration(self):
        """Test registering a new application."""
        data = {
            'full_name': 'Jane Smith',
            'date_of_birth': '1995-05-05',
            'years_of_experience': 3,
            'department': self.department.id,
            'resume': SimpleUploadedFile(
                name='resume.docx',
                content=b'Test Resume Content',
                content_type='application/vnd.openxmlformats-officedocument.'
                             'wordprocessingml.document'
            )
        }
        response = self.client.post(self.candidate_registration_url,
                                    data, format='multipart')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn('id', response.data)
        self.assertEqual(response.data['full_name'], data['full_name'])

    def test_applicant_list(self):
        """Test getting applications list from api."""
        response = self.client.get(self.applicant_list_url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        # Add the X-ADMIN header to the request
        response = self.client.get(self.applicant_list_url, HTTP_X_ADMIN='1')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_resume_download(self):
        """Test downloading the resume"""
        response = self.client.get(self.resume_download_url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        # Add the X-ADMIN header to the request
        response = self.client.get(self.resume_download_url, HTTP_X_ADMIN='1')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response['Content-Type'], 'application/pdf')
        self.assertEqual(response['Content-Length'],
                         str(len(b'Test Resume Content')))

    def tearDown(self):
        """Clean up the created objects after each test."""
        self.candidate.delete()
        self.department.delete()
