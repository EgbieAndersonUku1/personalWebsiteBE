from project.form import SearchForm


def get_search_form(request):
    form = SearchForm()
    return {
        "search_form": form
    }
