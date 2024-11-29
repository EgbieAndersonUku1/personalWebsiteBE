from .models import AboutModel


def get_about_me(request):
    return {
        "about_me": AboutModel.get_about_me()
    }