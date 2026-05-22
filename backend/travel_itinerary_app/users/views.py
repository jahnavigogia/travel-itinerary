from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.authentication import SessionAuthentication


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


class GoogleJWTLogin(APIView):
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user

        refresh = RefreshToken.for_user(user)

        return Response({
            "access": str(refresh.access_token),
            "refresh": str(refresh)
        })


class CurrentUserView(APIView):
    def get(self, request):
        return Response({"username": request.user.email}, status=status.HTTP_200_OK)