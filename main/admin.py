from django.contrib import admin

# Register your models here.

# main/admin.py
from django.contrib import admin
from .models import Project, Skill, Resume, ContactMessage, Profile

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'location']
    fields = ['name', 'tagline', 'bio', 'profile_image', 'email', 'github_url', 'linkedin_url', 'twitter_url', 'location']

@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ['name', 'category', 'proficiency', 'is_featured']
    list_filter = ['category', 'is_featured']
    search_fields = ['name']
    list_editable = ['proficiency', 'is_featured']

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ['title', 'status', 'is_featured', 'created_at']
    list_filter = ['status', 'is_featured', 'created_at']
    search_fields = ['title', 'description']
    list_editable = ['is_featured', 'status']
    filter_horizontal = ['technologies']
    readonly_fields = ['created_at', 'updated_at']

@admin.register(Resume)
class ResumeAdmin(admin.ModelAdmin):
    list_display = ['title', 'is_active', 'uploaded_at']
    list_filter = ['is_active', 'uploaded_at']

@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'subject', 'is_read', 'created_at']
    list_filter = ['is_read', 'created_at']
    search_fields = ['name', 'email', 'subject']
    list_editable = ['is_read']
    readonly_fields = ['created_at']
