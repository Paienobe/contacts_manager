from rest_framework.generics import GenericAPIView
from .serializers import UserRegisterSerializer, UserLoginSerializer, UserLogoutSerializer
from rest_framework.response import Response
from rest_framework import status
from .models import User
from rest_framework.permissions import IsAuthenticated

# Create your views here.


class RegisterUserView(GenericAPIView):
    serializer_class = UserRegisterSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            user = serializer.data
            user_instance = User.objects.get(id=user.get("id"))
            user_token = user_instance.tokens()
        return Response({
            "user": user,
            "msg": f"Welcome {user["first_name"]}. Thanks for signing up.",
            "refresh_token": user_token.get("refresh"),
            "access_token": user_token.get("access"),
        }, status=status.HTTP_201_CREATED)


class LoginUserView(GenericAPIView):
    serializer_class = UserLoginSerializer

    def post(self, request):
        serializer = self.serializer_class(
            data=request.data, context={"request": request})
        if (serializer.is_valid(raise_exception=True)):
            return Response(serializer.data, status=status.HTTP_200_OK)


class LogoutUser(GenericAPIView):
    serializer_class = UserLogoutSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(status=status.HTTP_204_NO_CONTENT)
