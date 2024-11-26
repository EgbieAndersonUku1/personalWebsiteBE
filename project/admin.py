from django.contrib import admin
from project.models import ProjectModel, FrontEndLanguageModel, FrameworkModel, BackendLanguageModel, LibrariesModel


# Register your models here.
class BaseLanguageAdmin(admin.ModelAdmin):
    list_display        = ["language", "created_on", "modified_on"]
    list_filter         = ["created_on"]
    search_fields       = ["language"]
    list_display_links  = ["language"]
    
    
class ProjectAdmin(admin.ModelAdmin):
    list_display      = ["id", "name", "created_on", "modified_on"]
    filter_horizontal = ("frontend_lang", "backend_lang", "framework", "libraries")  
     
     
class FrontEndLanguageAdmin(BaseLanguageAdmin):
    pass
   

class BackendLanguageAdmin(BaseLanguageAdmin):
    pass


class FrameworkAdmin(BaseLanguageAdmin):
    list_display        = ["framework", "created_on", "modified_on"]
    search_fields       = ["framework"]
    list_display_links  = ["framework"]


class LibrariesAdmin(BaseLanguageAdmin):
    list_display        = ["library", "created_on", "modified_on"]
    search_fields       = ["library"]
    list_display_links  = ["library"]
  


admin.site.register(ProjectModel, ProjectAdmin)
admin.site.register(FrontEndLanguageModel, FrontEndLanguageAdmin)
admin.site.register(BackendLanguageModel, BackendLanguageAdmin)
admin.site.register(FrameworkModel, FrameworkAdmin)
admin.site.register(LibrariesModel, LibrariesAdmin)
