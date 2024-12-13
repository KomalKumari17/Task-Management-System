from django.shortcuts import render, get_object_or_404, redirect
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from django.db import IntegrityError
from rest_framework.views import APIView
from django.contrib.auth import authenticate
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.exceptions import AuthenticationFailed
from .serializer import UserSerializer, UserProfileSerializer, TaskSerializer
from .models import UserProfile, Task
from rest_framework import viewsets, status
from rest_framework.exceptions import PermissionDenied


# Create your views here.
class RegisterUserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()  
    
    serializer_class = UserSerializer 

    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        if not serializer.is_valid():
            return Response({
                'status': 400,
                'errors': serializer.errors,
                'message': 'Invalid data provided.'
            }, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = serializer.save()
        except IntegrityError as e:
            error_message = str(e)
            if 'email' in error_message:
                message = 'Email already exists.'
            elif 'username' in error_message:
                message = 'Username already exists.'
            else:
                message = 'Username or email already exists.'

            return Response({
                'status': 400,
                'message': message,
                'errors': error_message
            }, status=status.HTTP_400_BAD_REQUEST)

        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)

        return Response({
            'status': 201,
            'payload': serializer.data,
            'token': access_token,
            'message': 'User registered successfully.'
        }, status=status.HTTP_201_CREATED)
    
class LoginUserViewSet(viewsets.ViewSet):
    def create(self, request):
        email = request.data.get("email")
        password = request.data.get("password")
        
        if not email or not password:
            return Response({
                'status': 400,
                'message': 'Email and password are required.'
            }, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({
                'status': 401,
                'message': 'Invalid credentials, please try again.'
            }, status=status.HTTP_401_UNAUTHORIZED)

        if not user.is_active:
            raise AuthenticationFailed("Account is disabled, please contact support.")

        if user.check_password(password):
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)

            return Response({
                'status': 200,
                'message': 'Login successful.',
                'token': access_token,
                'refresh': str(refresh),
                'user': {
                    'id': user.id,
                    'email': user.email,
                    'password': user.password,
                },
            }, status=status.HTTP_200_OK)
        else:
            return Response({
                'status': 401,
                'message': 'Invalid credentials, please try again.'
            }, status=status.HTTP_401_UNAUTHORIZED)
        
class UserViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserProfileViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = UserProfile.objects.select_related('user')
    serializer_class = UserProfileSerializer

class SingleUserProfileViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = UserProfileSerializer

    def get_queryset(self):
        return UserProfile.objects.filter(user=self.request.user)


class UserProfileCreate(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        if UserProfile.objects.filter(user=request.user).exists():
            return Response({'error': 'User Profile already exists.'}, status=status.HTTP_400_BAD_REQUEST)
        
        serializer = UserProfileSerializer(data=request.data, context={'request': request})
        
        if serializer.is_valid():
            try:
                serializer.save(user=request.user)
                return Response(serializer.data, status=status.HTTP_201_CREATED) 
            except IntegrityError as e:
                return Response({"error": "Database integrity error", "details": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class UserProfileDelete(APIView):
    def delete(self, request, pk):
        try:
            userprofile = UserProfile.objects.get(pk=pk)
            userprofile.delete()
            return Response({'message': 'UserProfile deleted successfuly'}, status=status.HTTP_204_NO_CONTENT)

        except UserProfile.DoesNotExist:
            return Response({'error': 'UserProfile not found or unauthorized'}, status=status.HTTP_404_NOT_FOUND)
        
class SingleUserTaskViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = TaskSerializer 
    def get_queryset(self):
        return Task.objects.filter(assigned_user = self.request.user)
    
class TaskViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Task.objects.select_related('assigned_user')
    serializer_class = TaskSerializer

    def perform_create(self, serializer):
        if not self.request.user.is_staff:
            raise PermissionDenied("Only admins can create tasks")
        assigned_user_id = self.request.data.get('assigned_user')  

        if not assigned_user_id:
            raise PermissionDenied("Assigned user ID must be provided")
        try:
            assigned_user = User.objects.get(id=assigned_user_id)
            if assigned_user.is_staff:
                raise PermissionDenied("Admin users cannot be assigned tasks")
        except User.DoesNotExist:
            raise PermissionDenied("Assigned user does not exist")
        serializer.save(assigned_user=assigned_user)

    def create(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return Response({"error": "User is not authenticated"}, status=status.HTTP_401_UNAUTHORIZED)

        if not request.user.is_staff:  
            return Response({"error": "Only admins can create tasks"}, status=status.HTTP_403_FORBIDDEN)

        return super().create(request, *args, **kwargs)



class TaskDelete(APIView):
    def delete(self, request, pk):
        try:
            task = Task.objects.get(pk=pk)
            task.delete()
            return Response({'message': 'Task deleted successfuly'}, status=status.HTTP_204_NO_CONTENT)

        except Task.DoesNotExist:
            return Response({'error': 'Task not found or unauthorized'}, status=status.HTTP_404_NOT_FOUND)