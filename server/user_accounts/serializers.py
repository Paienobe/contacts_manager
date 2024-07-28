from rest_framework import serializers
from .models import User


class UserRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        max_length=68, min_length=6, write_only=True)
    password2 = serializers.CharField(
        max_length=68, min_length=6, write_only=True)

    class Meta:
        model = User
        fields = ["id", "email", "first_name",
                  "last_name", "password", "password2"]

    def validate(self, attrs):
        password = attrs.get("password")
        password2 = attrs.get("password2")
        if password != password2:
            raise serializers.ValidationError("passwords do not match")
        return attrs

    def create(self, validated_data):
        # remove password2 from validated_data
        password2 = validated_data.pop("password2")
        user = User.objects.create_user(**validated_data)
        return user
