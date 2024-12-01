from django.db import models
from django_ckeditor_5.fields import CKEditor5Field


# Create your models here.

class BaseFaq(models.Model):
    question    = models.CharField(max_length=1000)
    answer      = CKEditor5Field("Answer", config_name="extends")
    created_at  = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        abstract = True
        
    @classmethod
    def get_all_faqs(cls):
        """
        Retrieve all FAQ entries (questions and answers) from the database. 
        This method should only be called from a subclass of BaseFaq. 
        Attempting to call it from BaseFaq itself will raise an error, as BaseFaq 
        is an abstract model and does not have a database table.
        """
        return cls.objects.all()


class GeneralInformationModel(BaseFaq):
    pass


class TechnicalExpertisesModel(BaseFaq):
    pass


class ContactMeModel(BaseFaq):
    pass


class HobbiesModel(BaseFaq):
    pass