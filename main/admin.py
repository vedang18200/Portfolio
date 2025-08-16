# main/admin.py - Enhanced with debugging (Updated Skills section - NO PROFICIENCY)
from django.contrib import admin
from django.utils.html import format_html
from django.contrib import messages
from .models import Profile, Project, Skill, Resume, ContactMessage
import logging

logger = logging.getLogger(__name__)

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'image_preview']  # Removed updated_at
    fields = [
        'name', 'tagline', 'bio', 'email', 'location',
        'profile_image',
        'github_url', 'linkedin_url', 'twitter_url'
    ]

    def image_preview(self, obj):
        if obj.profile_image:
            return format_html(
                '<img src="{}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 25px;" />',
                obj.profile_image.url
            )
        return "No image"
    image_preview.short_description = 'Profile Image'

    def image_url_debug(self, obj):
        """Debug field to show the actual URL being stored"""
        if obj.profile_image:
            return format_html('<code style="font-size: 10px;">{}</code>', obj.profile_image.url)
        return "No URL"
    image_url_debug.short_description = 'Image URL'

    def save_model(self, request, obj, form, change):
        try:
            super().save_model(request, obj, form, change)
            if obj.profile_image:
                messages.success(request, f'Profile image saved successfully. URL: {obj.profile_image.url}')
                logger.info(f'Profile image saved: {obj.profile_image.url}')
        except Exception as e:
            messages.error(request, f'Error saving profile image: {str(e)}')
            logger.error(f'Profile image save error: {str(e)}')

@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    # COMPLETELY REMOVED PROFICIENCY FROM ADMIN INTERFACE
    exclude = ['proficiency']  # Hide proficiency field from the form
    list_display = ['name', 'category', 'is_featured']  # Removed proficiency from list
    list_filter = ['category', 'is_featured']
    search_fields = ['name']
    list_editable = ['is_featured']  # Removed proficiency from editable fields
    ordering = ['name']  # Changed ordering since we're not showing proficiency

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ['title', 'status', 'is_featured', 'image_preview', 'image_url_debug', 'tech_count', 'created_at']
    list_filter = ['status', 'is_featured', 'technologies']
    search_fields = ['title', 'description']
    list_editable = ['status', 'is_featured']
    filter_horizontal = ['technologies']
    ordering = ['-created_at']

    fieldsets = (
        ('Basic Information', {
            'fields': ('title', 'short_description', 'description', 'status', 'is_featured', 'order')
        }),
        ('Media', {
            'fields': ('image',)
        }),
        ('Links', {
            'fields': ('github_url', 'live_url')
        }),
        ('Technologies', {
            'fields': ('technologies',)
        })
    )

    def tech_count(self, obj):
        return obj.technologies.count()
    tech_count.short_description = 'Tech Count'

    def image_preview(self, obj):
        if obj.image:
            return format_html(
                '<img src="{}" style="width: 60px; height: 45px; object-fit: cover; border-radius: 5px;" />',
                obj.image.url
            )
        return "No image"
    image_preview.short_description = 'Image'

    def image_url_debug(self, obj):
        """Debug field to show the actual URL being stored"""
        if obj.image:
            return format_html('<code style="font-size: 10px;">{}</code>', obj.image.url)
        return "No URL"
    image_url_debug.short_description = 'Image URL'

    def save_model(self, request, obj, form, change):
        try:
            super().save_model(request, obj, form, change)
            if obj.image:
                messages.success(request, f'Project image saved successfully. URL: {obj.image.url}')
                logger.info(f'Project image saved: {obj.image.url}')
        except Exception as e:
            messages.error(request, f'Error saving project image: {str(e)}')
            logger.error(f'Project image save error: {str(e)}')


@admin.register(Resume)
class ResumeAdmin(admin.ModelAdmin):
    list_display = ['title', 'is_active', 'file_link', 'download_link', 'file_url_debug', 'uploaded_at']
    list_filter = ['is_active', 'uploaded_at']
    fields = ['title', 'file', 'is_active']

    def file_link(self, obj):
        """Link to view the resume"""
        if obj.file:
            view_url = obj.get_view_url()
            if view_url:
                return format_html(
                    '<a href="{}" target="_blank">👁️ View Resume</a>',
                    view_url
                )
        return "No file"
    file_link.short_description = 'View File'

    def download_link(self, obj):
        """Link to download the resume"""
        if obj.file:
            download_url = obj.get_download_url()
            if download_url:
                return format_html(
                    '<a href="{}" target="_blank">📥 Download Resume</a>',
                    download_url
                )
        return "No file"
    download_link.short_description = 'Download File'

    def file_url_debug(self, obj):
        """Debug field to show the actual URL being stored"""
        if obj.file:
            return format_html('<code style="font-size: 10px;">{}</code>', obj.file.url)
        return "No URL"
    file_url_debug.short_description = 'File URL'

    def save_model(self, request, obj, form, change):
        try:
            super().save_model(request, obj, form, change)
            if obj.file:
                download_url = obj.get_download_url()
                messages.success(request, f'Resume saved successfully. Download URL: {download_url}')
                logger.info(f'Resume saved: {download_url}')
        except Exception as e:
            messages.error(request, f'Error saving resume: {str(e)}')
            logger.error(f'Resume save error: {str(e)}')

@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'subject', 'is_read', 'created_at']
    list_filter = ['is_read', 'created_at']
    search_fields = ['name', 'email', 'subject']
    readonly_fields = ['created_at']
    list_editable = ['is_read']

    fieldsets = (
        ('Contact Information', {
            'fields': ('name', 'email', 'subject')
        }),
        ('Message', {
            'fields': ('message',)
        }),
        ('Status', {
            'fields': ('is_read', 'created_at')
        })
    )

# Customize admin site
admin.site.site_header = 'Vedang Portfolio Admin'
admin.site.site_title = 'Portfolio Admin'
admin.site.index_title = 'Portfolio Management'
