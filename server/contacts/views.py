from rest_framework import generics
from .serializers import ContactSerializer
from .models import Contact


# Create your views here.


class CreateContactView(generics.CreateAPIView):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer

    def perform_create(self, serializer):
        user = self.request.user
        serializer.save(created_by=user)


class ListContactsView(generics.ListAPIView):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer


class EditContactView(generics.UpdateAPIView):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer


class DeleteContactView(generics.DestroyAPIView):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer
