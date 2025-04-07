from django.db import models

class Product(models.Model):
    name = models.CharField(max_length=100)
    price = models.IntegerField()
    img = models.CharField(max_length=255)  # 存放圖片路徑 "/img/items/xxx.jpg"

    def __str__(self):
        return self.name
