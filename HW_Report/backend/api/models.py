from django.db import models

class Product(models.Model):
    pid = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    price = models.IntegerField()
    img = models.CharField(max_length=255)  # 存放圖片路徑 "/img/items/xxx.jpg"

    def __str__(self):
        return self.name
    

class User(models.Model):
    uid = models.AutoField(primary_key=True)
    username = models.CharField(max_length=100)
    email = models.EmailField()
    password = models.CharField(max_length=100)

    def __str__(self):
        return self.username
