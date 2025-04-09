from django.contrib import admin
from django.contrib.auth.models import User
from django.contrib.auth.admin import UserAdmin as DefaultUserAdmin
from .models import Product, UserProfile 

admin.site.register(Product)
admin.site.register(UserProfile)  # ✅ 註冊 UserProfile 模型

class CustomUserAdmin(DefaultUserAdmin):
    list_display = ('username', 'email', 'is_staff')  # ✅ 只顯示你想要的欄位
    fieldsets = (
        (None, {'fields': ('username', 'password')}),
        ('Personal info', {'fields': ('email',)}),
        ('Permissions', {'fields': ('is_staff',)}),
    )

admin.site.unregister(User)
admin.site.register(User, CustomUserAdmin)
