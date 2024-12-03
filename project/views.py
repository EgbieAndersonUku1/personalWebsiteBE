import json
from django.http import JsonResponse
from django.shortcuts import render

from .models import ProjectModel
from .custom_filter import translate_status
# Create your views here.


def get_projects(request):
    """
    Handles a GET request to retrieve all projects and their related details.

    This function fetches all projects from the database, combines data from 
    related models such as frameworks, backend languages, frontend languages, 
    and libraries, and returns a JSON response with the project data.

    Args:
        request (HttpRequest): The HTTP request object, expected to be a GET request.

    Returns:
        JsonResponse: A JSON response containing:
            - `data` (list): A list of dictionaries, each representing a project with the following keys:
                - `id` (int): The unique identifier of the project.
                - `description` (str): The project's description.
                - `languages` (list): A list of combined titles of related frameworks, 
                  backend languages, frontend languages, and libraries.
                - `image` (str): The URL of the project's image.
                - `hasWebsite` (str): Indicates whether the project has a website 
                  ("yes", "no", or "both").
                - `dateCreated` (datetime): The date when the project was created.
                - `projectStatus` (str): The translated status of the project 
                  ("In progress", "Completed").
            - `message` (str): A success or error message.
        - HTTP status codes:
            - 200: Success.
            - 405: If the request method is not GET.
            - 500: If an exception occurs during data retrieval or processing.

    Example:
        A successful response:
        {
            "data": [
                {
                    "id": 1,
                    "description": "A web application project.",
                    "languages": ["CSS", "Django", "React"],
                    "image": "http://example.com/image.png",
                    "hasWebsite": "yes",
                    "dateCreated": "2024-11-27T12:00:00Z",
                    "projectStatus": "Completed"
                }
            ],
            "message": "Successfully retrieved projects"
        }

    Raises:
        Exception: If an error occurs while retrieving or processing project data.
    """
    if request.method == "GET":  
    
        projects = ProjectModel.get_all_projects()
        data = []
        
        try:
    
            for project in projects:
                
                frameworks    = [framework.framework.title() for framework in project.framework.all()]
                backend_lang  = [backend_lang.language.title() for backend_lang in project.backend_lang.all()]
                frontend_lang = [frontend_lang.language.upper() if frontend_lang.language == "css" else frontend_lang.language.title() 
                                    for frontend_lang in project.frontend_lang.all()
                                ]
                libraries     = [library.library.title() for library in project.libraries.all()]
                
                # Combine all languages into one list
                languages = frameworks + backend_lang + frontend_lang + libraries
                
                project_data = {
                    "id": project.id,
                    "description": project.description,
                    "languages": languages,
                    "image": project.image,
                    "hasWebsite": project.have_website,
                    "dateCreated": project.created_on,
                    "projectStatus": translate_status(project.progress_status)
                }
                
                data.append(project_data) 

            message = "Successfully retrieved projects"
            return create_json_response(data=data, message=message, code=200)

        except Exception as e:
            return create_json_response(data={}, message=f"Error: {str(e)}", code=500)

    message = "Invalid request method. Only GET requests are allowed."
    return create_json_response(data={}, message=message, code=405)


def create_json_response(data, message, code):
    """
    Creates a JSON response with a custom message, data, and HTTP status code.

    Args:
        data (dict): The data payload to include in the JSON response.
        message (str): A message describing the response.
        code (int): The HTTP status code for the response.

    Returns:
        JsonResponse: A JSON response with the specified payload and status code.
    """
    return JsonResponse({"data": data, "message": message}, status=code)


def search_projects(request):
    
    if request.method == "POST":
        data = json.loads(request.body.decode('utf-8'))
        form = data.get("form")
        
        # to add functionality to go here
    
    
    message = "Invalid request method. Only POST requests are allowed."
    return create_json_response(data={}, message=message, code=405)