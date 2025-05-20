from django.urls import path, include
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from django.conf import settings
from .views_dev import DevResetPasswordRequestToken

urlpatterns = [
    # path('', views.index),
    # path('login/', views.login),
    path('products/', views.get_products),
    path('products/<int:id>/', views.get_product_detail, name='get_product_detail'),  # 0519: Add product detail view
    path('register/', views.register_user),  # ✅ 註冊用 API
    path('become-seller/', views.become_seller),
    path('ajax-test/', views.ajax_test_view),
    path("track-event/", views.track_event),
    # path('password_reset/', include('django_rest_passwordreset.urls', namespace='password_reset')),

]

# 1️⃣ 先掛自訂「請求 token」(只攔 /password_reset/ 本身)
if settings.DEBUG:
    urlpatterns += [
        path(
            "password_reset/",
            DevResetPasswordRequestToken.as_view(),   # 只處理 POST /password_reset/
            name="password_reset",
        ),
    ]

# 2️⃣ 再把整包官方路由 include 進來（放在同一前綴）
#    這會自動提供：
#      • /password_reset/validate_token/
#      • /password_reset/confirm/
urlpatterns += [
    path(
        "password_reset/",
        include("django_rest_passwordreset.urls", namespace="password_reset"),
    ),
]