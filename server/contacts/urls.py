from django.urls import path
from .views import CreateContactView, ListContactsView, EditContactView, DeleteContactView

urlpatterns = [
    path("", ListContactsView.as_view(), name="create_contact"),
    path("create/", CreateContactView.as_view(), name="create_contact"),
    path("<uuid:pk>/update/", EditContactView.as_view(), name="update_contact"),
    path("<uuid:pk>/delete/", DeleteContactView.as_view(), name="delete_contact")
]
