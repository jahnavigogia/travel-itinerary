from rest_framework.views import APIView
from rest_framework import request, status
from rest_framework.response import Response
from django.contrib.auth import authenticate, login, logout
from rest_framework_simplejwt.tokens import RefreshToken

class GenerateJWTTokenView(APIView):
    pass


class LoginView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        if not email or not password:
            return Response({'error': 'Please provide email and password'}, status=status.HTTP_400_BAD_REQUEST)
        user = authenticate(email=email, password=password)     # returns user object if correct else None
        if user is not None:
            # login(request, user)
            refresh = RefreshToken.for_user(user)
            return Response({"message": "Login successful",
                             "refresh_token": refresh,
                             "access_token": str(refresh)},
                            status=status.HTTP_200_OK)
        else:
            return Response({"message": "Login failed"}, status=status.HTTP_401_UNAUTHORIZED)
