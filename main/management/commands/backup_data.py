from django.core.management.base import BaseCommand
from django.core import serializers
from main.models import Project, Skill, Profile, ContactMessage
import json
from datetime import datetime

class Command(BaseCommand):
    help = 'Backup portfolio data to JSON'

    def handle(self, *args, **options):
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        filename = f'portfolio_backup_{timestamp}.json'

        data = {
            'projects': serializers.serialize('json', Project.objects.all()),
            'skills': serializers.serialize('json', Skill.objects.all()),
            'profile': serializers.serialize('json', Profile.objects.all()),
            'messages': serializers.serialize('json', ContactMessage.objects.all()),
        }

        with open(filename, 'w') as f:
            json.dump(data, f, indent=2)

        self.stdout.write(self.style.SUCCESS(f'Data backed up to {filename}'))
