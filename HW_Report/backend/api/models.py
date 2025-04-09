from django.db import models
from django.contrib.auth.models import User

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    isSeller = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.user.username}'s profile"

class Product(models.Model):
    # pid = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    price = models.IntegerField()
    img = models.CharField(max_length=255)  # 存放圖片路徑 "/img/items/xxx.jpg"

    def __str__(self):
        return self.name