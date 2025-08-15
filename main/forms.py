# main/forms.py
from django import forms
from crispy_forms.helper import FormHelper
from crispy_forms.layout import Submit, Layout, Field, Row, Column
from crispy_forms.bootstrap import PrependedText
from .models import ContactMessage

class ContactForm(forms.ModelForm):
    """Enhanced contact form with crispy forms styling"""

    class Meta:
        model = ContactMessage
        fields = ['name', 'email', 'subject', 'message']
        widgets = {
            'name': forms.TextInput(attrs={
                'placeholder': 'Your Full Name',
                'class': 'form-control-dark'
            }),
            'email': forms.EmailInput(attrs={
                'placeholder': 'your.email@example.com',
                'class': 'form-control-dark'
            }),
            'subject': forms.TextInput(attrs={
                'placeholder': 'What is this about?',
                'class': 'form-control-dark'
            }),
            'message': forms.Textarea(attrs={
                'placeholder': 'Tell me about your project, question, or just say hello!',
                'rows': 6,
                'class': 'form-control-dark'
            }),
        }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.form_method = 'post'
        self.helper.form_class = 'contact-form'

        self.helper.layout = Layout(
            Row(
                Column('name', css_class='form-group col-md-6 mb-3'),
                Column('email', css_class='form-group col-md-6 mb-3'),
                css_class='form-row'
            ),
            Field('subject', css_class='form-group mb-3'),
            Field('message', css_class='form-group mb-4'),
            Submit('submit', 'Send Message', css_class='btn btn-primary btn-lg px-5')
        )

        # Add custom styling for dark theme
        for field_name, field in self.fields.items():
            field.widget.attrs.update({
                'class': field.widget.attrs.get('class', '') + ' form-control-dark'
            })
