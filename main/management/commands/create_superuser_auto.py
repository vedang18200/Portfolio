from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
import os

class Command(BaseCommand):
    help = 'Create a superuser automatically'

    def handle(self, *args, **options):
        if not User.objects.filter(username='admin').exists():
            User.objects.create_superuser(
                'admin',
                os.environ.get('ADMIN_EMAIL', 'admin@example.com'),
                os.environ.get('ADMIN_PASSWORD', 'defaultpassword')
            )
            self.stdout.write('Superuser created successfully')
        else:
            self.stdout.write('Superuser already exists')    
