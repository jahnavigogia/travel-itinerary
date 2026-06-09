from django.contrib.auth import get_user_model, authenticate, login
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.authentication import SessionAuthentication

from .serializers import CompleteProfileSerializer, UserProfileSerializer

User = get_user_model()

class GenerateJWTTokenView(APIView):
    pass

class LoginView(APIView):
    authentication_classes = []
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        if not email or not password:
            return Response({'error': 'Please provide email and password'}, status=status.HTTP_400_BAD_REQUEST)
        user = authenticate(email=email, password=password)     # returns user object if correct else None
        if user is not None:
            login(request, user)
            refresh = RefreshToken.for_user(user)
            return Response({"message": "Login successful",
                             "refresh_token": refresh,
                             "access_token": str(refresh)},
                            status=status.HTTP_200_OK)
        else:
            return Response({"message": "Invalid email or password."}, status=status.HTTP_401_UNAUTHORIZED)


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


class RegisterView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")

        if not email or not password:
            return Response(
                {"error": "Email and password required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        if User.objects.filter(email=email).exists():
            return Response(
                {"error": "User already exists"},
                status=status.HTTP_400_BAD_REQUEST
            )

        user = User.objects.create_user(
            email=email,
            password=password
        )

        return Response({
            "message": "User registered successfully"
        }, status=status.HTTP_201_CREATED)

class CurrentUserView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        user = request.user
        serializer = UserProfileSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)


class CompleteProfileView(APIView):
    permission_classes = [IsAuthenticated]
    def put(self, request):
        user = request.user
        data = request.data
        serializer = CompleteProfileSerializer(user, data=data, partial=True)
        if serializer.is_valid():
            user = serializer.save()
            print(user)
            user.isProfileCompleted = True
            user.save()
            print("Serializer:", serializer.data)
            return Response({"message": "Profile completed successfully."}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)