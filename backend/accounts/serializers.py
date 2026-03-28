from rest_framework import serializers
from .models import User, Verification

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name', 'email', 'password', 'birth_date', 'faculty', 'grade')
    
    id = serializers.UUIDField(read_only=True)
    password = serializers.CharField(write_only=True)

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)