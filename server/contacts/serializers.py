from rest_framework import serializers
from .models import Contact


class ContactSerializer(serializers.ModelSerializer):
    avatar = serializers.ImageField(write_only=True)

    class Meta:
        model = Contact
        fields = ["name", "phone_number", "email", "avatar", "image_url"]
