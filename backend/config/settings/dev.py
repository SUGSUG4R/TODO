from .base import *
import os

DEBUG = True
ALLOWED_HOSTS = ["localhost", "127.0.0.1"]
SECRET_KEY = os.environ.get('SECRET_KEY')

CORS_ALLOWED_ORIGINS = ["http://localhost:3000"]