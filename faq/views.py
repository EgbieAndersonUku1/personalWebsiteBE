from django.shortcuts import render

from faq.models import GeneralInformationModel, TechnicalExpertisesModel, ContactMeModel, HobbiesModel


# Create your views here.

def faq(request):
    general_information_faq = GeneralInformationModel.get_all_faqs()
    technical_faq           = TechnicalExpertisesModel.get_all_faqs()
    contact_faq             = ContactMeModel.get_all_faqs()
    hobbies_faq             = HobbiesModel.get_all_faqs()
    
    context = {
        "general_information_faq": general_information_faq,
        "technical_faq": technical_faq,
        "contact_faq": contact_faq,
        "hobbies_faq": hobbies_faq,
    }
    return render(request, "faq/faq.html", context=context)