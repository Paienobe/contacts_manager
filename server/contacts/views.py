from rest_framework.generics import CreateAPIView, ListAPIView
from .serializers import ContactSerializer
from .models import Contact
from rest_framework.response import Response

# Create your views here.


class CreateContactView(CreateAPIView):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer

    def perform_create(self, serializer):
        user = self.request.user
        serializer.save(created_by=user)


class ListContactsView(ListAPIView):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer
