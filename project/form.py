from django import forms
from project.models import ProjectModel



class SearchForm(forms.ModelForm):
    CHOICES = [(str(i), str(i)) for i in range(1, 11)]
    
    SORT_BY_CHOICES  = [("l", "Latest"), ("o", "Oldest")]
    
    keywords         = forms.CharField(max_length=400, required=False, label="Search by keywords (Separate by commas)")
    from_date        = forms.DateField(widget=forms.DateInput(attrs={"type": "date"}))
    to_date          = forms.DateField(widget=forms.DateInput(attrs={"type": "date"}))
    result_per_page  = forms.ChoiceField(choices=CHOICES)
    sort_by          = forms.ChoiceField(choices=SORT_BY_CHOICES, label="Sort projects by")
    
    class Meta:
        model   = ProjectModel
        fields  = ["name", "frontend_lang", "backend_lang", "framework", "libraries", "have_website", "progress_status"]
        widgets = {
            'frontend_lang': forms.CheckboxSelectMultiple(),
            'backend_lang': forms.CheckboxSelectMultiple(),
            'framework': forms.CheckboxSelectMultiple(),
            'libraries': forms.CheckboxSelectMultiple(),
            'have_website': forms.RadioSelect(),   
        }
        
    def __init__(self, *args, **kwargs) -> None:
        super().__init__(*args, **kwargs)
        self.fields["name"].widget.attrs.update({
                "placeholder": "Search by name....",
                "max": "300",
            })
        self.fields["keywords"].widget.attrs.update({"placeholder": "Enter keywords separated by commas..."})