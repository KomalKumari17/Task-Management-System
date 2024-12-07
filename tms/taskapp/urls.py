from django.contrib import admin
from django.urls import path
from django.urls import path, include
from taskapp.views import LoginUser, RegisterUser, UserViewSet, UserProfileCreate, UserProfileDelete, TaskCreate, TaskViewSet, TaskDelete, UserProfileViewSet
from rest_framework import routers

router = routers.DefaultRouter()

urlpatterns = [
    path('', include(router.urls)),
    path('auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('register/', RegisterUser.as_view(), name='register'),
    path('login/', LoginUser.as_view(), name='login'),

    path('user/view/', UserViewSet.as_view({'get':'list'}), name='user-view'),

    path('userprofile/view/', UserProfileViewSet.as_view({'get':'list'}), name='userprofile-view'),
    path('userprofile/create/', UserProfileCreate.as_view(), name='userprofile-create'),  
    path('userprofile/<int:pk>/', UserProfileDelete.as_view(), name='userprofile-delete'),

    path('task/create/', TaskCreate.as_view(), name='task-create'),  
    path('task/<int:pk>/', TaskDelete.as_view(), name='task-delete'),
    path('task/view/', TaskViewSet.as_view({'get':'list'}), name='task-view'),

]