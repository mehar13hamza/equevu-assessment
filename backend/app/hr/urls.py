from django.conf import settings
from django.conf.urls.static import static
from django.urls import path

from .views import (
    ApisList,
    CandidateRegistrationAPIView,
    ApplicantListAPIView,
    ResumeDownloadAPIView
)

urlpatterns = [
    path('', ApisList.as_view(), name='api-endpoints'),
    path('candidates/registration/',
         CandidateRegistrationAPIView.as_view(),
         name='candidate-registration'),
    path('candidates/',
         ApplicantListAPIView.as_view(),
         name='applicant-list'),
    path('candidates/<int:pk>/resume/',
         ResumeDownloadAPIView.as_view(),
         name='resume-download'),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
