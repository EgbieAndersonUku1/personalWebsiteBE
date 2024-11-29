from django.apps import AppConfig


class AboutConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'about'

    def ready(self):
        # Import the signals here to connect them
        import about.signals