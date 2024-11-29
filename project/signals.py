from django.db.models.signals import pre_save
from django.dispatch import receiver

from project.models import (LibraryModel, 
                            FrameworkModel, 
                            FrontEndLanguageModel, 
                            BackendLanguageModel
                            )


@receiver(pre_save, sender=LibraryModel)
def pre_save_library(sender, instance, *args, **kwargs):
    if instance:
        instance.library = instance.library.lower()
        

@receiver(pre_save, sender=FrameworkModel)
def pre_save_framework(sender, instance, *args, **kwargs):
    if instance:
        instance.framework = instance.framework.lower()


@receiver(pre_save, sender=FrontEndLanguageModel)
def pre_save_frontend_lang(sender, instance, *args, **kwargs):
    if instance:
        if instance.language.lower() == "javascript":
            instance.language = "JavaScript"
        elif instance.language.lower() == "html" or instance.language.lower() == "css":
            instance.language = instance.language.upper()
        else:
            instance.language = instance.language.lower()


@receiver(pre_save, sender=BackendLanguageModel)
def pre_save_backend_lang(sender, instance, *args, **kwargs):
    if instance:
        instance.language = instance.language.lower()