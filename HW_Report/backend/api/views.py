from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Product
from .serializers import ProductSerializer
from django.contrib.auth.models import User
from rest_framework import status

@api_view(['GET'])
def get_products(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def register_user(request):
    username = request.data.get('username')
    password = request.data.get('password')
    email = request.data.get('email')  # 新增接收 email

    print(f"Received data: {request.data}")

    if User.objects.filter(username=username).exists():
        return Response({'error': '使用者已存在'}, status=400)

    user = User.objects.create_user(username=username, password=password, email=email)
    return Response({'message': '註冊成功'})