from django import template

register = template.Library()


@register.filter(name="translate_status")
def translate_status(arg):
    """
    Django template filter to translate status codes into human-readable strings.

    This custom filter is intended for use in Django templates to provide
    meaningful descriptions of status codes. It leverages a predefined mapping
    of codes to their translations.

    Args:
        arg (str): The status code to translate.

    Returns:
        str: The translated value corresponding to the input code, or
             an empty string if the code is not recognized.

    Usage in Django templates:
        {{ status|translate_status }}
    """
    return _get_translation(arg)


def _get_translation(arg):
    """
    Retrieves the translated value for a given status code.

    This function provides a mapping of specific status codes to their 
    human-readable string equivalents. If the provided code does not 
    match any key in the mapping, it returns an empty string.

    Args:
        arg (str): The status code to translate. Expected values are:
            - "y": "Yes"
            - "n": "No"
            - "b": "Both"
            - "ip": "In Progress"
            - "c": "Completed"

    Returns:
        str: The translated value corresponding to the input code, or
             an empty string if the code is not recognized.
    """
    translations = {
        "y": "Yes",
        "n": "No",
        "b": "Both",
        "ip": "In Progress",
        "c": "Completed"
    }
    return translations.get(arg.lower(), "")

