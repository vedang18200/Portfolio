from django.core.management.base import BaseCommand
from main.models import Skill

class Command(BaseCommand):
    help = 'Update skill proficiencies and add new skills'

    def add_arguments(self, parser):
        parser.add_argument('--skill', type=str, help='Skill name')
        parser.add_argument('--proficiency', type=int, help='Proficiency level (0-100)')

    def handle(self, *args, **options):
        if options['skill'] and options['proficiency']:
            skill, created = Skill.objects.get_or_create(
                name=options['skill'],
                defaults={'proficiency': options['proficiency']}
            )
            if not created:
                skill.proficiency = options['proficiency']
                skill.save()

            self.stdout.write(
                self.style.SUCCESS(
                    f'{"Created" if created else "Updated"} skill: {skill.name} ({skill.proficiency}%)'
                )
            )
        else:
            self.stdout.write('Usage: python manage.py update_skills --skill "Python" --proficiency 90')
