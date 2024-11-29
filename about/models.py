from django.db import models
from django_ckeditor_5.fields import CKEditor5Field

# Create your models here.

class AboutModel(models.Model):
    title       = models.CharField(max_length=50)
    about       = CKEditor5Field("About me", config_name="extends")
    created_on  = models.DateTimeField(auto_now_add=True)
    modified_on = models.DateTimeField(auto_now=True)
    live        = models.BooleanField(default=False)
    
    @classmethod
    def get_about_me(cls, live=True):
        """
        Retrieves the 'About Me' section from the database.

        This method returns a single instance of the `AboutModel` that matches the 
        specified `live` status. By default, it fetches the "live" instance, meaning 
        the one currently marked as active or displayed. If no instance matches the 
        query, `None` is returned.

        :Params
            :live: A boolean value that indicates whether to retrieve the live 
                    "About Me" section (default: True).
            :type live: bool

        :return: The `AboutModel` instance that matches the `live` status or 
                `None` if no instance is found.
        :rtype: AboutModel or None

        :raises: MultipleObjectsReturned if more than one "About Me" instance is found 
                with the specified `live` status.
        """
        try:
            return cls.objects.get(live=live)
        except cls.DoesNotExist:
            return None