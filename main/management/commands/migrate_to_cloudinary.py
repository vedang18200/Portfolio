# Create this file: main/management/commands/migrate_to_cloudinary.py

import os
from django.core.management.base import BaseCommand
from django.core.management import call_command
from main.models import Profile, Project, Skill, Resume

class Command(BaseCommand):
    help = 'Migrate to Cloudinary storage'

    def handle(self, *args, **options):
        self.stdout.write("🚀 Starting Cloudinary Migration...")

        # Check environment variables
        self.stdout.write("📋 Checking environment variables...")

        cloud_name = os.environ.get('CLOUDINARY_CLOUD_NAME')
        api_key = os.environ.get('CLOUDINARY_API_KEY')
        api_secret = os.environ.get('CLOUDINARY_API_SECRET')

        if not all([cloud_name, api_key, api_secret]):
            self.stdout.write(
                self.style.ERROR('❌ Missing Cloudinary environment variables!')
            )
            return

        self.stdout.write(
            self.style.SUCCESS(f'✅ Environment variables OK - Cloud: {cloud_name}')
        )

        # Create backup
        self.stdout.write("💾 Creating backup...")
        try:
            call_command('dumpdata', 'main', output='backup_cloudinary.json')
            self.stdout.write(self.style.SUCCESS('✅ Backup created'))
        except Exception as e:
            self.stdout.write(self.style.WARNING(f'⚠️ Backup failed: {e}'))

        # Create migrations
        self.stdout.write("🔧 Creating migrations...")
        try:
            call_command('makemigrations', 'main', name='switch_to_cloudinary')
            self.stdout.write(self.style.SUCCESS('✅ Migrations created'))
        except Exception as e:
            self.stdout.write(self.style.ERROR(f'❌ Migration creation failed: {e}'))
            return

        # Run migrations
        self.stdout.write("⚙️ Running migrations...")
        try:
            call_command('migrate')
            self.stdout.write(self.style.SUCCESS('✅ Migrations applied'))
        except Exception as e:
            self.stdout.write(self.style.ERROR(f'❌ Migration failed: {e}'))
            return

        # Test database
        self.stdout.write("🔍 Testing database...")
        try:
            profile_count = Profile.objects.count()
            project_count = Project.objects.count()
            skill_count = Skill.objects.count()
            resume_count = Resume.objects.count()

            self.stdout.write(self.style.SUCCESS(f'✅ Profiles: {profile_count}'))
            self.stdout.write(self.style.SUCCESS(f'✅ Projects: {project_count}'))
            self.stdout.write(self.style.SUCCESS(f'✅ Skills: {skill_count}'))
            self.stdout.write(self.style.SUCCESS(f'✅ Resumes: {resume_count}'))

        except Exception as e:
            self.stdout.write(self.style.ERROR(f'❌ Database test failed: {e}'))
            return

        self.stdout.write(
            self.style.SUCCESS('🎉 MIGRATION SUCCESSFUL!')
        )
        self.stdout.write("📝 Next Steps:")
        self.stdout.write("1. Go to Django Admin")
        self.stdout.write("2. Re-upload all images and files")
        self.stdout.write("3. Test frontend functionality")
