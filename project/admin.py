from django.contrib import admin
from project.models import ProjectModel, FrontEndLanguageModel, FrameworkModel, BackendLanguageModel, LibraryModel


# Register your models here.
class BaseLanguageAdmin(admin.ModelAdmin):
    list_display        = ["language", "created_on", "modified_on"]
    list_filter         = ["created_on"]
    search_fields       = ["language"]
    list_display_links  = ["language"]
    readonly_fields    = ["modified_on"]
    
   
    
    
class ProjectAdmin(admin.ModelAdmin):
    list_display       = ["id", "name", "created_on", "modified_on", "featured", "have_website", "progress_status"]
    filter_horizontal  = ("frontend_lang", "backend_lang", "framework", "libraries")  
    list_display_links = ["id", "name"]
    list_per_page      = 30
    readonly_fields    = ["modified_on"]
    
    fieldsets = [
        (
            None,
            {
                "fields": ["name", "description", "image"],
            },
        ),
        (
            "Languages",
            {
                "classes": ["collapse"],
                "fields": ["frontend_lang", "backend_lang"],
            },
        ),
        
         (
            "Frameworks",
            {
                "classes": ["collapse"],
                "fields": ["framework"],
            },
        ),
         
        (
            "Libraries",
            {
                "classes": ["collapse"],
                "fields": ["libraries"],
            },
        ),
        (
            "Urls",
            {
                "classes": ["collapse"],
                "fields": ["website_url", "github_url"],
            },
        ),
        
         (
            "Additional information",
            {
                "classes": ["collapse"],
                "fields": ["have_website", "progress_status", "created_on", "modified_on"],
            },
        ),
    ]
    
    
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
admin.site.register(LibraryModel, LibrariesAdmin)
