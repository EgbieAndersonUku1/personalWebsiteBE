from django.db.models.signals import post_save
from django.dispatch import receiver
from django.db import transaction


from about.models import AboutModel

@receiver(post_save, sender=AboutModel)
def post_save_about_model(sender, instance, created, *args, **kwargs):
    """
    Ensures only one AboutModel instance can have 'live=True'.
    When an instance is saved with 'live=True', all other instances are updated to 'live=False'.
    """
    
    if instance.live:
        with transaction.atomic():
            AboutModel.objects.filter(live=True).exclude(id=instance.pk).update(live=False)
    elif not instance.live and not created:
        pass