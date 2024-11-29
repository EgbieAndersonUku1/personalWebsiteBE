from django.contrib import admin

from about.models import AboutModel


# Register your models here.

class AboutMeModelAdmin(admin.ModelAdmin):
    list_display = ["id", "title", "created_on", "modified_on", "live"]



admin.site.register(AboutModel, AboutMeModelAdmin)