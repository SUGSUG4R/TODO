from .base import *
import os

DEBUG=False

CORS_ALLOWED_ORIGINS = [os.environ.get("ALLOWED_ORIGINS_URL", "")]

SECRET_KEY = os.environ.get('SECRET_KEY')

ALLOWED_HOSTS = [os.environ.get("ALLOWED_HOSTS_URL", "")]