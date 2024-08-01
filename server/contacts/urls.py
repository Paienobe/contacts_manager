from django.urls import path
from .views import CreateContactView, ListContactsView

urlpatterns = [
    path("", ListContactsView.as_view(), name="create_contact"),
    path("create/", CreateContactView.as_view(), name="create_contact")
]
