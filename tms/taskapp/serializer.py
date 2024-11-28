from rest_framework import serializers
from .models import User, Task, UserProfile

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

# User Serializer
class UserProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    email = serializers.EmailField(source='user.email', read_only=True)

    class Meta:
        model = UserProfile
        fields = [
            'id', 'username', 'email', 'bio', 'profile_image', 
            'contact', 'address', 'city', 'state', 'country', 
            'created_at', 'updated_at'
        ]
        read_only_fields = ['username', 'email', 'created_at', 'updated_at']

    def create(self, validated_data):
        user = self.context['request'].user 
        validated_data['user'] = user  
        return UserProfile.objects.create(**validated_data)

    def update(self, instance, validated_data):
        for field, value in validated_data.items():
            setattr(instance, field, value)
        instance.save()
        return instance

    def validate_bio(self, value):
        if value and not value.strip():
            raise serializers.ValidationError("Bio cannot be empty or just spaces.")
        return value

    def validate_address(self, value):
        if not value.strip():
            raise serializers.ValidationError("Address cannot be empty or just spaces.")
        return value

    def validate_contact(self, value):
        if not value.isdigit():
            raise serializers.ValidationError("Contact number must contain only digits.")
        if len(value) < 10:
            raise serializers.ValidationError("Phone number must have at least 10 digits.")
        return value

    def validate_profile_image(self, value):
        if value and value.size > 5 * 1024 * 1024:  
            raise serializers.ValidationError("Profile picture must be under 5 MB.")
        return value

    def validate_city(self, value):
        if not value.strip():
            raise serializers.ValidationError("City cannot be empty or just spaces.")
        return value

    def validate_state(self, value):
        if not value.strip():
            raise serializers.ValidationError("State cannot be empty or just spaces.")
        return value

    def validate_country(self, value):
        if not value.strip():
            raise serializers.ValidationError("Country cannot be empty or just spaces.")
        return value



# Task Serializer
class TaskSerializer(serializers.ModelSerializer):
    assigned_user = UserSerializer(read_only=True)  

    class Meta:
        model = Task
        fields = [
            'id', 'title', 'description', 'is_completed',
            'due_date', 'created_at', 'updated_at', 'assigned_user', 'assigned_user_id'
        ]

    def create(self, validated_data):
        if 'assigned_user' not in validated_data:
            validated_data['assigned_user'] = self.context['request'].user  

        return super().create(validated_data)
