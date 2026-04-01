import uuid
from django.db import models
from accounts.models import User

# Create your models here.
class Task(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    task_abs = models.CharField(max_length=50)
    task_det = models.CharField(max_length=500)
    deadline = models.DateField()