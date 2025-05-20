from django.conf import settings
from django_rest_passwordreset.views import ResetPasswordRequestToken
from django_rest_passwordreset.models import ResetPasswordToken
from rest_framework.response import Response

class DevResetPasswordRequestToken(ResetPasswordRequestToken):
    """
    DEBUG 環境才回傳 token
    """
    def post(self, request, *args, **kwargs):
        # 先跑原本流程（會產生並寄出 token）
        original_response = super().post(request, *args, **kwargs)

        if settings.DEBUG and original_response.status_code == 200:
            # 取出最新 token
            email = request.data.get("email")
            token_obj = ResetPasswordToken.objects.filter(user__email=email).latest("created_at")
            original_response.data["token"] = token_obj.key

        return original_response
