from .base import *
import os

DEBUG = True
ALLOWED_HOSTS = ["localhost", "127.0.0.1"]
SECRET_KEY = os.environ.get('SECRET_KEY')
# メール設定（開発環境）
EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'