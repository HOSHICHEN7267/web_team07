from django.apps import AppConfig


class ApiConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'api'

def ready(self):
    import api.signals  # 記得把這行改成你的 app 名稱

