# main/views.py
from django.shortcuts import render, get_object_or_404, redirect
from django.http import HttpResponse, Http404
from django.contrib import messages
from django.core.mail import send_mail
from django.conf import settings
from django.views.generic import DetailView
from django.db.models import Q
from .models import Project, Skill, Resume, ContactMessage, Profile
from .forms import ContactForm
import mimetypes

def home(request):
    """Home page with featured projects and skills"""
    profile = Profile.objects.first()
    featured_projects = Project.objects.filter(is_featured=True)[:6]
    featured_skills = Skill.objects.filter(is_featured=True)[:8]

    context = {
        'profile': profile,
        'featured_projects': featured_projects,
        'featured_skills': featured_skills,
    }
    return render(request, 'main/home.html', context)

def about(request):
    """About page with detailed information"""
    profile = Profile.objects.first()
    skills_by_category = {}

    for skill in Skill.objects.all():
        category = skill.get_category_display()
        if category not in skills_by_category:
            skills_by_category[category] = []
        skills_by_category[category].append(skill)

    context = {
        'profile': profile,
        'skills_by_category': skills_by_category,
    }
    return render(request, 'main/about.html', context)

def projects(request):
    """Projects listing page with search and filter"""
    projects_list = Project.objects.all()

    # Search functionality
    search_query = request.GET.get('search')
    if search_query:
        projects_list = projects_list.filter(
            Q(title__icontains=search_query) |
            Q(description__icontains=search_query) |
            Q(technologies__name__icontains=search_query)
        ).distinct()

    # Filter by technology
    tech_filter = request.GET.get('tech')
    if tech_filter:
        projects_list = projects_list.filter(technologies__name__iexact=tech_filter)

    # Filter by status
    status_filter = request.GET.get('status')
    if status_filter:
        projects_list = projects_list.filter(status=status_filter)

    # Get all technologies for filter dropdown
    all_technologies = Skill.objects.filter(projects__isnull=False).distinct()

    context = {
        'projects': projects_list,
        'all_technologies': all_technologies,
        'search_query': search_query,
        'current_tech': tech_filter,
        'current_status': status_filter,
    }
    return render(request, 'main/projects.html', context)

class ProjectDetailView(DetailView):
    """Detailed view for individual projects"""
    model = Project
    template_name = 'main/project_detail.html'
    context_object_name = 'project'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        # Get related projects (same technologies)
        related_projects = Project.objects.filter(
            technologies__in=self.object.technologies.all()
        ).exclude(pk=self.object.pk).distinct()[:3]
        context['related_projects'] = related_projects
        return context

def contact(request):
    """Contact page with working form"""
    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
            # Save the contact message
            contact_message = ContactMessage.objects.create(
                name=form.cleaned_data['name'],
                email=form.cleaned_data['email'],
                subject=form.cleaned_data['subject'],
                message=form.cleaned_data['message']
            )

            # Send email notification
            try:
                send_mail(
                    subject=f"Portfolio Contact: {form.cleaned_data['subject']}",
                    message=f"""
                    New message from your portfolio:

                    Name: {form.cleaned_data['name']}
                    Email: {form.cleaned_data['email']}
                    Subject: {form.cleaned_data['subject']}

                    Message:
                    {form.cleaned_data['message']}
                    """,
                    from_email=settings.EMAIL_HOST_USER,
                    recipient_list=[settings.EMAIL_HOST_USER],
                    fail_silently=False,
                )
                messages.success(request, 'Thank you! Your message has been sent successfully.')
            except Exception as e:
                messages.warning(request, 'Message saved but email notification failed. I will still get back to you!')

            return redirect('contact')
    else:
        form = ContactForm()

    profile = Profile.objects.first()
    context = {
        'form': form,
        'profile': profile,
    }
    return render(request, 'main/contact.html', context)

def download_resume(request):
    """Download the latest active resume"""
    try:
        resume = Resume.objects.filter(is_active=True).first()
        if not resume:
            raise Http404("No active resume found")

        file_path = resume.file.path
        with open(file_path, 'rb') as f:
            file_data = f.read()

        # Determine the file type
        content_type, _ = mimetypes.guess_type(file_path)
        if content_type is None:
            content_type = 'application/octet-stream'

        response = HttpResponse(file_data, content_type=content_type)
        response['Content-Disposition'] = f'attachment; filename="Vedang_Deshmukh_Resume.pdf"'
        return response

    except Exception as e:
        messages.error(request, 'Resume download failed. Please try again later.')
        return redirect('home')

def skills_api(request):
    """API endpoint for skills data (for animations)"""
    skills = Skill.objects.all().values('name', 'proficiency', 'category', 'icon')
    skills_data = list(skills)

    from django.http import JsonResponse
    return JsonResponse({'skills': skills_data})

def search_projects(request):
    """AJAX search for projects"""
    query = request.GET.get('q', '')
    if query:
        projects = Project.objects.filter(
            Q(title__icontains=query) |
            Q(description__icontains=query)
        )[:5]

        results = []
        for project in projects:
            results.append({
                'title': project.title,
                'url': project.get_absolute_url(),
                'description': project.short_description,
                'image': project.image.url if project.image else None,
            })

        from django.http import JsonResponse
        return JsonResponse({'results': results})

    from django.http import JsonResponse
    return JsonResponse({'results': []})
