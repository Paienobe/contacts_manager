from rest_framework import serializers
from .models import User
from django.contrib.auth import authenticate
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.tokens import RefreshToken, TokenError


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "email", "first_name", "last_name"]


class UserRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        max_length=68, min_length=6, write_only=True)
    password2 = serializers.CharField(
        max_length=68, min_length=6, write_only=True)

    class Meta:
        model = User
        fields = ["id", "email", "first_name",
                  "last_name", "password", "password2"]
        read_only_fields = ["id"]

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


class UserLoginSerializer(serializers.Serializer):
    email = serializers.CharField(
        max_length=268, min_length=6, write_only=True)
    password = serializers.CharField(max_length=68, write_only=True)
    user = UserSerializer(read_only=True)
    refresh_token = serializers.CharField(read_only=True, max_length=256)
    access_token = serializers.CharField(read_only=True, max_length=256)

    class Meta:
        fields = ["email", "password", "user", "refresh_token", "access_token"]

    def validate(self, attrs):
        email = attrs.get("email")
        password = attrs.get("password")
        request = self.context.get("request")
        user = authenticate(request, email=email, password=password)
        if not user:
            raise AuthenticationFailed(
                "Invalid credentials. Please try again.")
        user_token = user.tokens()
        return {
            "user": user,
            "access_token": user_token.get("access"),
            "refresh_token": user_token.get("refresh"),
        }


class UserLogoutSerializer(serializers.Serializer):
    refresh_token = serializers.CharField()
    default_error_messages = {"bad_token": ("Token is invalid or has expired")}

    def validate(self, attrs):
        self.token = attrs.get("refresh_token")
        return attrs

    def save(self, **kwargs):
        try:
            token = RefreshToken(self.token)
            token.blacklist()
        except TokenError:
            return self.fail("bad_token")
