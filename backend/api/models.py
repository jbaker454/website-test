from django.db import models
import uuid
# Create your models here.

class TimeStampedModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class User(models.Model):
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False
    )
    name = models.CharField(max_length=100)

class Post(models.Model):
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False
    )
    description = models.CharField(max_length=100)
    text = models.CharField(max_length=1000)
    publisher = models.ForeignKey(User, on_delete=models.CASCADE)
    time_stamp = models.ForeignKey(TimeStampedModel, on_delete=models.CASCADE)


