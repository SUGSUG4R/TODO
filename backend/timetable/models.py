import uuid
from django.db import models
from accounts.models import User
from django.core.validators import MinValueValidator, MaxValueValidator

# Create your models here.

class Lesson(models.Model):
    WEEK_DAYS_CHOICES = [
        ('月', '月曜日'),
        ('火', '火曜日'),
        ('水', '水曜日'),
        ('木', '木曜日'),
        ('金', '金曜日'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    lesson_name = models.CharField(max_length=100)
    week_day = models.CharField(max_length=3, choices=WEEK_DAYS_CHOICES)
    period = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])