from django.shortcuts import render
from django.core.mail import send_mail
from django.utils import timezone
from django.conf import settings
from rest_framework import status
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView
from .models import User, Verification
from .serializers import UserSerializer, CustomTokenObtainPairSerializer
import datetime

# Create your views here.
class RegisterView(generics.CreateAPIView):
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        user = serializer.save()
        expires = timezone.now() + datetime.timedelta(minutes=30)
        verification = Verification.objects.create(user = user, expires = expires)
        subject = "メールアドレスのご確認"
        message = "TODOにご登録いただいたメールアドレスを確認します。\n30分以内に下記へアクセスし、登録を完了してください。\n"+f"{settings.FRONTEND_URL}/verify/?token={verification.token}"
        from_email = "hoge@gmail.com"
        recipient_list = [user.email]
        send_mail(subject, message, from_email, recipient_list)

class VerifyEmailView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        token = request.query_params.get('token')
        try:
            verification = Verification.objects.get(token=token)
        except Verification.DoesNotExist:
            return Response({'error': 'トークンが無効です'}, status=status.HTTP_400_BAD_REQUEST)
        
        if timezone.now() > verification.expires:
            return Response({'error': 'トークンが期限切れです'}, status = status.HTTP_401_UNAUTHORIZED)
        
        user = verification.user
        user.is_verified = True
        user.save()
        return Response({'message': '認証が完了しました'})

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer