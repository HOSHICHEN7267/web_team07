from django.urls import path, include
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    # path('', views.index),
    # path('login/', views.login),
    path('products/', views.get_products),
    path('products/<int:id>/', views.get_product_detail, name='get_product_detail'),  # 0519: Add product detail view
    path('register/', views.register_user),  # ✅ 註冊用 API
    path('become-seller/', views.become_seller),
    path('ajax-test/', views.ajax_test_view),
    path("track-event/", views.track_event),
    path('password_reset/', include('django_rest_passwordreset.urls', namespace='password_reset')),

]