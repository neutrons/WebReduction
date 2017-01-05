from django.apps import AppConfig

class UsersConfig(AppConfig):
    name = 'server.apps.users'

    def ready(self):
        import server.apps.users.signals
