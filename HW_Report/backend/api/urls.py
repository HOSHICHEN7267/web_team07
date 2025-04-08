from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    # path('', views.index),
    # path('login/', views.login),
    path('products/', views.get_products),
    path('register/', views.register_user),  # ✅ 註冊用 API
]
