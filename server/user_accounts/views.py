from rest_framework.generics import GenericAPIView
from .serializers import UserRegisterSerializer
from rest_framework.response import Response
from rest_framework import status
from .models import User

# Create your views here.


class RegisterUserView(GenericAPIView):
    serializer_class = UserRegisterSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            user = serializer.data
            user_instance = User.objects.get(id=serializer.data.get("id"))
            user_token = user_instance.tokens()
        return Response({
            "user": user,
            "msg": f"Welcome {user["first_name"]}. Thanks for signing up.",
            "refresh_token": user_token.get("refresh"),
            "access_token": user_token.get("access"),
        }, status=status.HTTP_201_CREATED)
