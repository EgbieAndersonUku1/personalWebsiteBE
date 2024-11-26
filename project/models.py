from django.db import models

# Create your models here.

class ProjectModel(models.Model):
        
    class HaveWebsiteChoices(models.TextChoices):
        YES  = "yes", "Yes"
        NO   = "no", "No"
        BOTH = "both", "Both"
    
    class ProjectStatus(models.TextChoices):
        IN_PROGRESS = "ip", "In progress"
        COMPLETED   = "c", "Completed"
        
    name            = models.CharField(max_length=50)
    description     = models.TextField()
    image           = models.URLField(max_length=300)
    frontend_lang   = models.ManyToManyField("FrontEndLanguageModel", blank=True)
    backend_lang    = models.ManyToManyField("BackendLanguageModel", blank=True)
    framework       = models.ManyToManyField("FrameworkModel", blank=True)
    libraries       = models.ManyToManyField("LibrariesModel", blank=True)
    have_website    = models.CharField(max_length=4,  choices=HaveWebsiteChoices.choices, default=HaveWebsiteChoices.NO)
    website_url     = models.URLField(max_length=255)
    github_url      = models.URLField(max_length=255)
    progress_status = models.CharField(max_length=2, choices=ProjectStatus.choices, default=ProjectStatus.IN_PROGRESS)
    created_on      = models.DateTimeField(blank=True)
    modified_on     = models.DateField(auto_now=True)
    
  
 # Allows any language to be dynamically entered
 
class FrontEndLanguageModel(models.Model):
    language     = models.CharField(max_length=50) 
    created_on   = models.DateTimeField(auto_now_add=True)
    modified_on  = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.language


class BackendLanguageModel(models.Model):
    language     = models.CharField(max_length=50)
    created_on   = models.DateTimeField(auto_now_add=True)
    modified_on  = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.language


class FrameworkModel(models.Model):
    framework    = models.CharField(max_length=50)
    created_on   = models.DateTimeField(auto_now_add=True)
    modified_on  = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.framework


class LibrariesModel(models.Model):
    library      = models.CharField(max_length=50, blank=True)
    created_on   = models.DateTimeField(auto_now_add=True)
    modified_on  = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.library