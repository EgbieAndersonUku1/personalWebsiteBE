from django.shortcuts import render

from project.models import ProjectModel

# Create your views here.


def home_page(request):
    projects = ProjectModel.get_featured()
    
    context = {
        "projects": projects
    }
   
    return render(request, "home/home.html", context=context)



