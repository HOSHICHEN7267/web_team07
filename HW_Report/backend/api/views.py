from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Product
from .serializers import ProductSerializer
from django.contrib.auth.models import User
from rest_framework import status
from .models import UserProfile
from .models import EventLog

@api_view(['GET'])
def get_products(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_product_detail(request, id):    # 0519: Add product detail view
    try:
        product = Product.objects.get(id=id)
    except Product.DoesNotExist:
        return Response({'error': '找不到商品'}, status=status.HTTP_404_NOT_FOUND)

    serializer = ProductSerializer(product)
    return Response(serializer.data)

@api_view(['GET'])
def ajax_test_view(request):
    return Response({'message': 'response from AJAX'})

@api_view(['POST'])
def register_user(request):
    username = request.data.get('username')
    password = request.data.get('password')
    email = request.data.get('email')  # 新增接收 email

    print(f"Received data: {request.data}")

    if User.objects.filter(username=username).exists():
        return Response({'error': '使用者已存在'}, status=400)

    user = User.objects.create_user(username=username, password=password, email=email)

    # 確保 Profile 已經有建立（signals 應該會做，但保險起見）
    if not hasattr(user, 'userprofile'):
        UserProfile.objects.create(user=user)

    return Response({'message': '註冊成功'})


@api_view(['POST'])
def become_seller(request):

    user = request.user
    profile = user.userprofile  # ✅ 從 User 拿到對應的 UserProfile

    profile.isSeller = True
    profile.save()

    return Response({"message": f"{user.username} 現在是賣家了！"})

@api_view(['POST'])
def track_event(request):
    try:
        event_type = request.data.get("event_type")
        product_id = request.data.get("product_id")
        username = request.data.get("username", "anonymous")

        # 存入資料庫
        EventLog.objects.create(
            username=username,
            event_type=event_type,
            product=Product.objects.filter(id=product_id).first()
        )

        return Response({"status": "ok"})
    except Exception as e:
        return Response({"status": "error", "message": str(e)}, status=400)