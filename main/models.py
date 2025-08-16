# main/models.py - COMPLETE VERSION WITH ALL IMPORTS

from django.db import models
from django.urls import reverse
from django.core.validators import URLValidator
from cloudinary.models import CloudinaryField
import uuid

class Skill(models.Model):
    SKILL_CATEGORIES = [
        ('programming', 'Programming Languages'),
        ('framework', 'Frameworks'),
        ('database', 'Databases'),
        ('tool', 'Tools & Technologies'),
        ('ai_ml', 'AI/ML'),
        ('other', 'Other'),
    ]

    name = models.CharField(max_length=100)
    category = models.CharField(max_length=20, choices=SKILL_CATEGORIES, default='other')
    proficiency = models.IntegerField(default=50, help_text="Proficiency percentage (0-100)")
    icon = models.CharField(max_length=50, blank=True, help_text="Font Awesome icon class")
    is_featured = models.BooleanField(default=False, help_text="Show on main page")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-proficiency', 'name']

    def __str__(self):
        return f"{self.name} ({self.proficiency}%)"

class Project(models.Model):
    PROJECT_STATUS = [
        ('completed', 'Completed'),
        ('in_progress', 'In Progress'),
        ('planned', 'Planned'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=200)
    short_description = models.CharField(max_length=250, help_text="Brief description for cards")
    description = models.TextField(help_text="Detailed project description")

    # CloudinaryField with HTTPS
    image = CloudinaryField(
        'image',
        blank=True,
        null=True,
        transformation={
            'width': 800,
            'height': 600,
            'crop': 'fill',
            'quality': 'auto',
            'format': 'webp'
        },
        folder='portfolio/projects',
        secure=True  # Forces HTTPS
    )

    github_url = models.URLField(blank=True, validators=[URLValidator()])
    live_url = models.URLField(blank=True, validators=[URLValidator()], help_text="Live demo URL")
    technologies = models.ManyToManyField(Skill, blank=True, related_name='projects')
    status = models.CharField(max_length=20, choices=PROJECT_STATUS, default='completed')
    is_featured = models.BooleanField(default=False, help_text="Show on main page")
    order = models.PositiveIntegerField(default=0, help_text="Display order")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-is_featured', 'order', '-created_at']

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        return reverse('project_detail', kwargs={'pk': self.pk})

class Resume(models.Model):
    title = models.CharField(max_length=100, default="My Resume")

    # CloudinaryField for files with HTTPS
    file = CloudinaryField(
        'raw',
        resource_type='raw',
        folder='portfolio/documents',
        allowed_formats=['pdf', 'doc', 'docx'],
        secure=True  # Forces HTTPS
    )

    is_active = models.BooleanField(default=True, help_text="Currently active resume")
    uploaded_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-uploaded_at']

    def __str__(self):
        return f"{self.title} - {self.uploaded_at.strftime('%Y-%m-%d')}"

    def save(self, *args, **kwargs):
        if self.is_active:
            # Set all other resumes to inactive
            Resume.objects.filter(is_active=True).update(is_active=False)
        super().save(*args, **kwargs)

class ContactMessage(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    subject = models.CharField(max_length=200)
    message = models.TextField()
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"Message from {self.name} - {self.subject}"

class Profile(models.Model):
    name = models.CharField(max_length=100, default="Vedang Deshmukh")
    tagline = models.CharField(max_length=200, default="Aspiring AIML Student and Developer")
    bio = models.TextField(default="I am a second-year Computer Science student specializing in Artificial Intelligence and Machine Learning.")

    # CloudinaryField with HTTPS
    profile_image = CloudinaryField(
        'image',
        blank=True,
        null=True,
        transformation={
            'width': 500,
            'height': 500,
            'crop': 'fill',
            'gravity': 'face',  # Focus on face when cropping
            'quality': 'auto',
            'format': 'webp'
        },
        folder='portfolio/profile',
        secure=True  # Forces HTTPS
    )

    email = models.EmailField(default="vedangdeshmukh777@gmail.com")
    github_url = models.URLField(default="https://github.com/vedang18200")
    linkedin_url = models.URLField(blank=True)
    twitter_url = models.URLField(blank=True)
    location = models.CharField(max_length=100, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "Profile"
