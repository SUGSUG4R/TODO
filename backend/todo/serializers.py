from rest_framework import serializers
from .models import Task


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ('id', 'task_abs', 'task_det', 'deadline')
        read_only_fields = ('id',)
