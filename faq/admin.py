from django.contrib import admin

from faq.models import GeneralInformationModel, TechnicalExpertisesModel, ContactMeModel, HobbiesModel


# Register your models here.

class BaseModel(admin.ModelAdmin):
    list_display        = ["id", "question"]
    list_display_links  = ["id", "question"]
    readonly_fields     = ["created_at", "modified_at"]
    list_per_page       = 25
    

class GeneralInformationModelAdmin(BaseModel):
    pass 


class TechnicalExpertisesModelAdmin(BaseModel):
    pass 


class ContactMeModelAdmin(BaseModel):
    pass 


class HobbiesModelAdmin(BaseModel):
    pass 


admin.site.register(GeneralInformationModel, GeneralInformationModelAdmin)
admin.site.register(TechnicalExpertisesModel, TechnicalExpertisesModelAdmin)
admin.site.register(ContactMeModel, ContactMeModelAdmin)
admin.site.register(HobbiesModel, HobbiesModelAdmin)