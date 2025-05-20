from django.db.models.signals import post_save
from django.contrib.auth.models import User
from django.dispatch import receiver
from .models import UserProfile

from django_rest_passwordreset.signals import reset_password_token_created

print("=== signals.py loaded ===")

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        UserProfile.objects.create(user=instance)

# @receiver(reset_password_token_created)
# def password_reset_token_created(sender, instance, reset_password_token, *args, **kwargs):
#     print(f"[🔐 Token] 使用者 {reset_password_token.user.email} 重設密碼用的 token 是：{reset_password_token.key}")
@receiver(reset_password_token_created)
def password_reset_token_created(sender, instance, reset_password_token, *args, **kwargs):
    frontend_url = (
        f"http://localhost:5173/reset-password"
        f"?token={reset_password_token.key}"
        f"&email={reset_password_token.user.email}"
    )
    print("=" * 50)
    print(f"🔗 密碼重設連結（直接點即可）:")
    print(frontend_url)
    print("=" * 50)