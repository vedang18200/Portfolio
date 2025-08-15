# main/management/commands/test_cloudinary.py
# Create this file to test your Cloudinary setup

from django.core.management.base import BaseCommand
from django.conf import settings
import cloudinary
import cloudinary.uploader

class Command(BaseCommand):
    help = 'Test Cloudinary configuration'

    def handle(self, *args, **options):
        try:
            # Test Cloudinary connection
            result = cloudinary.api.ping()
            self.stdout.write(
                self.style.SUCCESS(f'✅ Cloudinary connection successful: {result}')
            )

            # Check configuration
            self.stdout.write(f"Cloud Name: {settings.CLOUDINARY_STORAGE.get('CLOUD_NAME')}")
            self.stdout.write(f"API Key: {settings.CLOUDINARY_STORAGE.get('API_KEY')[:5]}...")

            # Test upload (optional - creates a small test file)
            # test_upload = cloudinary.uploader.upload(
            #     "https://via.placeholder.com/150",
            #     folder="portfolio/test"
            # )
            # self.stdout.write(f"✅ Test upload successful: {test_upload['url']}")

        except Exception as e:
            self.stdout.write(
                self.style.ERROR(f'❌ Cloudinary test failed: {str(e)}')
            )
