from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from .models import Destination, Activity
from .serializers import DestinationSerializer, ActivitySerializer

class ListDestinationView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        dests = Destination.objects.filter(user=request.user)
        if not dests:
            return Response(data=[])
        serializer = DestinationSerializer(dests, many=True)
        return Response(serializer.data)


class CreateDestinationView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        user = request.user
        if not user.isProfileCompleted:
            return Response({"error":"Please complete your profile before creating your first trip."}, status=status.HTTP_400_BAD_REQUEST)
        serializer = DestinationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class DestinationDetailView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        id = request.GET.get("id")
        dest = get_object_or_404(Destination, id=id)
        return Response(DestinationSerializer(dest).data)
    

class UpdateDestinationView(APIView):
    permission_classes = [IsAuthenticated]
    def put(self, request):
        id = request.GET.get("id")
        dest = get_object_or_404(Destination, id=id)
        serializer = DestinationSerializer(dest, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class DeleteDestinationView(APIView):
    permission_classes = [IsAuthenticated]
    def delete(self, request):
        id = request.GET.get("id")
        dest = get_object_or_404(Destination, id=id)
        dest.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class ActivityListCreateView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        acts = Activity.objects.all()
        return Response(ActivitySerializer(acts, many=True).data)

    def post(self, request):
        serializer = ActivitySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk):
        act = get_object_or_404(Activity, pk=pk)
        act.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class UpdateActivityView(APIView):
    permission_classes = [IsAuthenticated]
    def put(self, request):
        id = request.GET.get("id")
        dest = get_object_or_404(Activity, id=id)
        serializer = ActivitySerializer(dest, data=request.data, many=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class ActivityDetailView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        act_id = request.GET.get("id")
        act = get_object_or_404(Activity, id=act_id)
        return Response(ActivitySerializer(act).data)

    def put(self, request, pk):
        act = get_object_or_404(Activity, pk=pk)
        serializer = ActivitySerializer(act, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class HomePageView(APIView):
    def get(self, request):
        # print("Welcome to home page")
        return Response({"message": "Welcome to home page"})
