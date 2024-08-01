from django.db import models
import uuid
from django.conf import settings
from user_accounts.models import User

# Create your models here.


class Contact(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=256)
    phone_number = models.CharField(max_length=15)
    email = models.EmailField()
    avatar = models.ImageField(upload_to="uploads/contacts")
    created_by = models.ForeignKey(
        User, related_name="contact", on_delete=models.CASCADE,)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def image_url(self):
        if self.avatar:
            return f"{settings.SERVER_URL}{self.avatar.url}"
        else:
            return ""

    def __str__(self):
        return self.email
