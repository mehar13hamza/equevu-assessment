from rest_framework import generics, status
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework.views import APIView
import mimetypes

from .models import Candidate
from .serializers import CandidateRegistrationSerializer, CandidateSerializer


class ApisList(APIView):
    """Return the list of endpoints"""

    def get(self, request):
        # Return a list of available endpoints
        return Response({
            0: 'candidates/',
            1: 'candidates/registration/',
            2: 'candidates/<int:pk>/resume/',
        })


class CandidateRegistrationAPIView(generics.CreateAPIView):
    """User Registration"""
    queryset = Candidate.objects.all()
    serializer_class = CandidateRegistrationSerializer
    parser_classes = (MultiPartParser, FormParser)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED,
            headers=headers
        )


class ApplicantListAPIView(generics.ListAPIView):
    """Return the list of applicants"""
    queryset = Candidate.objects.all().order_by('-id')
    serializer_class = CandidateSerializer

    def get(self, request, *args, **kwargs):
        if not request.META.get('HTTP_X_ADMIN') == '1':
            # Return a 403 Forbidden response for non-admin users
            return Response(
                {'message': 'Admin access required.'},
                status=status.HTTP_403_FORBIDDEN
            )
        return super().get(request, *args, **kwargs)


class ResumeDownloadAPIView(generics.RetrieveAPIView):
    queryset = Candidate.objects.all()
    serializer_class = CandidateSerializer

    def get(self, request, *args, **kwargs):
        if not request.META.get('HTTP_X_ADMIN') == '1':
            # Return a 403 Forbidden response for non-admin users
            return Response(
                {'message': 'Admin access required.'},
                status=status.HTTP_403_FORBIDDEN
            )

        instance = self.get_object()
        resume_file = instance.resume

        response = Response()
        response['Content-Disposition'] = 'attachment; filename="{0}"'\
            .format(resume_file.name)

        # Determine the content type using the file extension
        content_type, _ = mimetypes.guess_type(resume_file.name)
        response['Content-Type'] = content_type

        response['Content-Length'] = resume_file.size

        resume_data = resume_file.read()
        response.content = resume_data

        return response
