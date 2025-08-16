# main/management/commands/fix_cloudinary_images.py
# Create this directory structure: main/management/commands/

from django.core.management.base import BaseCommand
from main.models import Profile, Project, Resume
import cloudinary.uploader
import requests
from urllib.parse import urlparse

class Command(BaseCommand):
    help = 'Re-upload any locally stored images to Cloudinary'

    def handle(self, *args, **options):
        self.stdout.write('🔄 Checking and fixing image storage...')

        # Check Profile images
        profiles = Profile.objects.all()
        for profile in profiles:
            if profile.profile_image:
                self.check_and_fix_image(profile, 'profile_image', 'portfolio/profile')

        # Check Project images
        projects = Project.objects.all()
        for project in projects:
            if project.image:
                self.check_and_fix_image(project, 'image', 'portfolio/projects')

        # Check Resume files
        resumes = Resume.objects.all()
        for resume in resumes:
            if resume.file:
                self.check_and_fix_file(resume, 'file', 'portfolio/documents')

        self.stdout.write(self.style.SUCCESS('✅ Image fixing completed!'))

    def check_and_fix_image(self, obj, field_name, folder):
        """Check if image is properly stored in Cloudinary"""
        field = getattr(obj, field_name)
        if not field:
            return

        # Check if URL is from Cloudinary
        url = str(field)
        if 'cloudinary.com' not in url:
            self.stdout.write(f'⚠️  Found non-Cloudinary image for {obj}: {url}')
            # This would need manual re-upload through admin
            self.stdout.write(f'   Please re-upload this image through Django admin')
        else:
            # Test if Cloudinary URL is accessible
            try:
                response = requests.head(url, timeout=10)
                if response.status_code != 200:
                    self.stdout.write(f'⚠️  Cloudinary image not accessible for {obj}: {url}')
                    self.stdout.write(f'   Please re-upload this image through Django admin')
                else:
                    self.stdout.write(f'✅ Image OK for {obj}')
            except requests.RequestException:
                self.stdout.write(f'⚠️  Cannot verify image for {obj}: {url}')

    def check_and_fix_file(self, obj, field_name, folder):
        """Check if file is properly stored in Cloudinary"""
        field = getattr(obj, field_name)
        if not field:
            return

        url = str(field)
        if 'cloudinary.com' not in url:
            self.stdout.write(f'⚠️  Found non-Cloudinary file for {obj}: {url}')
            self.stdout.write(f'   Please re-upload this file through Django admin')
        else:
            try:
                response = requests.head(url, timeout=10)
                if response.status_code != 200:
                    self.stdout.write(f'⚠️  Cloudinary file not accessible for {obj}: {url}')
                    self.stdout.write(f'   Please re-upload this file through Django admin')
                else:
                    self.stdout.write(f'✅ File OK for {obj}')
            except requests.RequestException:
                self.stdout.write(f'⚠️  Cannot verify file for {obj}: {url}')
