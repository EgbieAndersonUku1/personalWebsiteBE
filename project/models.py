from django.db import models

# Create your models here.

class ProjectModel(models.Model):
        
    class HaveWebsiteChoices(models.TextChoices):
        YES  = "y", "Yes"
        NO   = "n", "No"
      
    class ProjectStatus(models.TextChoices):
        IN_PROGRESS = "ip", "In progress"
        COMPLETED   = "c", "Completed"
    
    class Meta:
        verbose_name        = "ProjectModel"
        verbose_name_plural = "ProjectsModel"
        
    name            = models.CharField(max_length=50)
    description     = models.TextField()
    image           = models.URLField(max_length=300)
    frontend_lang   = models.ManyToManyField("FrontEndLanguageModel", blank=True)
    backend_lang    = models.ManyToManyField("BackendLanguageModel", blank=True)
    featured        = models.BooleanField(default=False)
    framework       = models.ManyToManyField("FrameworkModel", blank=True)
    libraries       = models.ManyToManyField("LibraryModel", blank=True)
    have_website    = models.CharField(max_length=4,  choices=HaveWebsiteChoices.choices, default=HaveWebsiteChoices.NO)
    website_url     = models.URLField(max_length=255, blank=True, null=True)
    github_url      = models.URLField(max_length=255)
    progress_status = models.CharField(max_length=2, choices=ProjectStatus.choices, default=ProjectStatus.IN_PROGRESS)
    created_on      = models.DateTimeField(blank=True)
    modified_on     = models.DateField(auto_now=True)
    
    
    @classmethod
    def get_all_projects(cls):
        """Returns all the projects ordered by the latest created with related fields preloaded"""
        return cls.objects.prefetch_related(
            "frontend_lang", "backend_lang", "framework", "libraries"
        ).order_by("-created_on")
  
 # Allows any language to be dynamically entered
 
class FrontEndLanguageModel(models.Model):
    language     = models.CharField(max_length=50, unique=True) 
    created_on   = models.DateTimeField(auto_now_add=True)
    modified_on  = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name        = "FrontEndLanguageModel"
        verbose_name_plural = "FrontEndLanguagesModel"

    def __str__(self):
        return self.language
  
    
class BackendLanguageModel(models.Model):
    language     = models.CharField(max_length=50, unique=True)
    created_on   = models.DateTimeField(auto_now_add=True)
    modified_on  = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name        = "BackendLanguageModel"
        verbose_name_plural = "BackendLanguagesModel"
        
    def __str__(self):
        return self.language
    
    

class FrameworkModel(models.Model):
    framework    = models.CharField(max_length=50, unique=True)
    created_on   = models.DateTimeField(auto_now_add=True)
    modified_on  = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name        = "FrameworkModel"
        verbose_name_plural = "FrameworksModel"
        
    def __str__(self):
        return self.framework
    
  
class LibraryModel(models.Model):
    library      = models.CharField(max_length=50, blank=True, unique=True)
    created_on   = models.DateTimeField(auto_now_add=True)
    modified_on  = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name        = "LibraryModel"
        verbose_name_plural = "LibrariesModel"

    def __str__(self):
        return self.library
    
    