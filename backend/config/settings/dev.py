from .base import *
import os

DEBUG = True
ALLOWED_HOSTS = ["localhost", "127.0.0.1", "django"]
SECRET_KEY = os.environ.get('SECRET_KEY')
FRONTEND_URL = os.environ.get('FRONTEND_URL', 'http://localhost:3000')
# メール設定（開発環境）
EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'

CORS_ALLOWED_ORIGINS = ["http://localhost:3000"]