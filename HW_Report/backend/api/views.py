from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Product
from .serializers import ProductSerializer
from django.contrib.auth.models import User
from rest_framework import status
from .models import UserProfile
from .models import EventLog
from .serializers import RegisterSerializer
import os
import google.generativeai as genai
import logging


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
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()

        # 確保 Profile 有建立
        if not hasattr(user, 'userprofile'):
            UserProfile.objects.create(user=user)

        return Response({'message': '註冊成功'}, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


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
    

logger = logging.getLogger(__name__)  # 設定 log

@api_view(['POST'])
def chat_with_gemini(request):
    api_key = os.environ.get("GOOGLE_API_KEY")
    logger.info(f"✅ Gemini API Key: {api_key}")  # 確保印出

    if not api_key:
        return Response({"error": "GOOGLE_API_KEY not found"}, status=500)

    try:
        genai.configure(api_key=api_key)
        user_message = request.data.get('message')

        if not user_message:
            return Response({"error": "缺少 message"}, status=400)

        model = genai.GenerativeModel("gemini-1.5-flash")
        chat = model.start_chat(history=[])
        response = chat.send_message(user_message)
        reply = response.text.strip()
        return Response({"reply": reply})

    except Exception as e:
        logger.exception("❌ Gemini error:")
        return Response({"error": str(e)}, status=500)
