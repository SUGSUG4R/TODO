import uuid
from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    faculty = models.CharField(max_length=150, null=False)
    grade = models.IntegerField(null=False)
    is_verified = models.BooleanField(default=False)

class Verification(models.Model):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE
    )
    token = models.UUIDField(default=uuid.uuid4, editable=False)
    expires = models.DateTimeField()