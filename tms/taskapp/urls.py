from django.contrib import admin
from django.urls import path
from django.urls import path, include
from taskapp.views import *
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r"admin/user", UserViewSet)
router.register(r"self/userprofile", SingleUserProfileViewSet, basename='self-userprofile')
router.register(r"admin/userprofile", UserProfileViewSet, basename='userprofile')
router.register(r"admin/task", TaskViewSet)
router.register(r'tasks', SingleUserTaskViewSet, basename='user-task')
router.register(r"admin/login", LoginUserViewSet, basename='login')
router.register(r"admin/register", RegisterUserViewSet, basename='register')

urlpatterns = [
    path('', include(router.urls)),
    path('auth/', include('rest_framework.urls', namespace='rest_framework')),
    # path('register/', RegisterUserViewSet.as_view(), name='register'),
    # path('login/', LoginUserViewSet.as_view(), name='login'),

  
]