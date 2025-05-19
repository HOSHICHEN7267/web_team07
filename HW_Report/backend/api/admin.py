from django.contrib import admin
from django.contrib.auth.models import User
from django.contrib.auth.admin import UserAdmin as DefaultUserAdmin
from .models import Product, UserProfile, EventLog


# Register Product model
admin.site.register(Product)

# Register UserProfile model with custom admin
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'isSeller')
    list_filter = ('isSeller',)
admin.site.register(UserProfile, UserProfileAdmin)


# Update User model with custom admin
class CustomUserAdmin(DefaultUserAdmin):
    list_display = ('username', 'email', 'is_staff')  # 只顯示想要的欄位
    fieldsets = (
        (None, {'fields': ('username', 'password')}),
        ('Personal info', {'fields': ('email',)}),
        ('Permissions', {'fields': ('is_staff',)}),
    )
admin.site.unregister(User)
admin.site.register(User, CustomUserAdmin)
admin.site.register(EventLog)


