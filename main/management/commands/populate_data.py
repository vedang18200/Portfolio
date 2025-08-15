# main/management/commands/populate_data.py
from django.core.management.base import BaseCommand
from main.models import Profile, Skill, Project, Resume
import os

class Command(BaseCommand):
    help = 'Populate initial data for portfolio'

    def handle(self, *args, **options):
        self.stdout.write('Populating initial portfolio data...')

        # Create Profile
        profile, created = Profile.objects.get_or_create(
            name="Vedang Deshmukh",
            defaults={
                'tagline': "Aspiring AIML Student and Developer",
                'bio': "I am a second-year Computer Science student specializing in Artificial Intelligence and Machine Learning. I excel at crafting elegant digital experiences and am proficient in various programming languages and technologies.",
                'email': "vedangdeshmukh777@gmail.com",
                'github_url': "https://github.com/vedang18200",
                'location': "India"
            }
        )

        # Create Skills
        skills_data = [
            # Programming Languages
            {'name': 'Python', 'category': 'programming', 'proficiency': 85, 'icon': 'fab fa-python', 'is_featured': True},
            {'name': 'JavaScript', 'category': 'programming', 'proficiency': 75, 'icon': 'fab fa-js', 'is_featured': True},
            {'name': 'Java', 'category': 'programming', 'proficiency': 70, 'icon': 'fab fa-java', 'is_featured': False},
            {'name': 'C++', 'category': 'programming', 'proficiency': 65, 'icon': 'fas fa-code', 'is_featured': False},

            # Frameworks
            {'name': 'Django', 'category': 'framework', 'proficiency': 80, 'icon': 'fas fa-server', 'is_featured': True},
            {'name': 'React', 'category': 'framework', 'proficiency': 70, 'icon': 'fab fa-react', 'is_featured': True},
            {'name': 'Bootstrap', 'category': 'framework', 'proficiency': 85, 'icon': 'fab fa-bootstrap', 'is_featured': False},
            {'name': 'Kivy', 'category': 'framework', 'proficiency': 60, 'icon': 'fas fa-mobile-alt', 'is_featured': False},

            # AI/ML
            {'name': 'TensorFlow', 'category': 'ai_ml', 'proficiency': 75, 'icon': 'fas fa-brain', 'is_featured': True},
            {'name': 'PyTorch', 'category': 'ai_ml', 'proficiency': 70, 'icon': 'fas fa-fire', 'is_featured': True},
            {'name': 'Scikit-learn', 'category': 'ai_ml', 'proficiency': 80, 'icon': 'fas fa-chart-line', 'is_featured': True},
            {'name': 'OpenCV', 'category': 'ai_ml', 'proficiency': 75, 'icon': 'fas fa-eye', 'is_featured': True},
            {'name': 'Pandas', 'category': 'ai_ml', 'proficiency': 85, 'icon': 'fas fa-table', 'is_featured': False},
            {'name': 'NumPy', 'category': 'ai_ml', 'proficiency': 80, 'icon': 'fas fa-calculator', 'is_featured': False},

            # Databases
            {'name': 'SQLite', 'category': 'database', 'proficiency': 75, 'icon': 'fas fa-database', 'is_featured': False},
            {'name': 'PostgreSQL', 'category': 'database', 'proficiency': 65, 'icon': 'fas fa-database', 'is_featured': False},
            {'name': 'MongoDB', 'category': 'database', 'proficiency': 60, 'icon': 'fas fa-leaf', 'is_featured': False},

            # Tools
            {'name': 'Git', 'category': 'tool', 'proficiency': 80, 'icon': 'fab fa-git-alt', 'is_featured': False},
            {'name': 'Docker', 'category': 'tool', 'proficiency': 55, 'icon': 'fab fa-docker', 'is_featured': False},
            {'name': 'Linux', 'category': 'tool', 'proficiency': 70, 'icon': 'fab fa-linux', 'is_featured': False},
            {'name': 'Arduino', 'category': 'tool', 'proficiency': 75, 'icon': 'fas fa-microchip', 'is_featured': False},
        ]

        for skill_data in skills_data:
            skill, created = Skill.objects.get_or_create(
                name=skill_data['name'],
                defaults=skill_data
            )
            if created:
                self.stdout.write(f'Created skill: {skill.name}')

        # Create Projects based on your GitHub
        projects_data = [
            {
                'title': 'IoT Energy Meter',
                'short_description': 'Smart energy monitoring system using IoT technology',
                'description': '''A comprehensive IoT-based Smart Energy Meter project that monitors and tracks energy consumption in real-time.
                This first-year engineering project demonstrates the integration of hardware and software for smart energy management.

                Key Features:
                - Real-time energy monitoring
                - Data logging and analytics
                - Remote monitoring capabilities
                - Cost-effective energy tracking
                - User-friendly interface

                The system helps users monitor their electricity consumption patterns and promotes energy conservation through intelligent tracking.''',
                'github_url': 'https://github.com/vedang18200/Iot-Energy-meter',
                'status': 'completed',
                'is_featured': True,
                'technologies': ['Arduino', 'C++', 'IoT']
            },
            {
                'title': 'Veronica AI Chatbot',
                'short_description': 'Intelligent conversational AI chatbot with natural language processing',
                'description': '''VeronicaIAI is an advanced chatbot built using Python and natural language processing techniques.
                This project showcases machine learning capabilities in creating conversational AI systems.

                Features:
                - Natural language understanding
                - Context-aware conversations
                - Machine learning-based responses
                - Extensible architecture
                - Multiple conversation topics

                The chatbot can engage in meaningful conversations and learn from user interactions to improve response quality.''',
                'github_url': 'https://github.com/vedang18200/VeronicaIAI',
                'status': 'completed',
                'is_featured': True,
                'technologies': ['Python', 'TensorFlow', 'NLP']
            },
            {
                'title': 'Face Recognition System',
                'short_description': 'Real-time face recognition with database integration',
                'description': '''A sophisticated face recognition system that uses computer vision and machine learning for real-time face detection and recognition.
                The system integrates with a database for storing and managing face data.

                Technical Features:
                - Real-time face detection using OpenCV
                - Machine learning-based face recognition
                - Database integration for face data storage
                - High accuracy recognition algorithms
                - User-friendly interface

                Applications include security systems, attendance management, and access control.''',
                'github_url': 'https://github.com/vedang18200/face_recognition-',
                'status': 'completed',
                'is_featured': True,
                'technologies': ['Python', 'OpenCV', 'Machine Learning']
            },
            {
                'title': 'AI Health Bot',
                'short_description': 'Healthcare chatbot providing medical assistance and guidance',
                'description': '''An AI-powered health bot designed to provide medical information and health guidance to users.
                This project combines healthcare knowledge with AI to create an accessible health consultation system.

                Capabilities:
                - Symptom analysis and suggestions
                - Health information database
                - Medical guidance and recommendations
                - User health history tracking
                - Emergency contact features

                The bot serves as a preliminary health consultation tool while emphasizing the importance of professional medical advice.''',
                'github_url': 'https://github.com/vedang18200/The-AI-health-Bot',
                'status': 'completed',
                'is_featured': True,
                'technologies': ['Python', 'Jupyter Notebook', 'AI/ML']
            },
            {
                'title': 'Redesigner.io (Contribution)',
                'short_description': 'AI-powered interior and exterior home redesign tool',
                'description': '''Contributed to an innovative AI-powered platform that helps users redesign their house interior and exterior using artificial intelligence.
                This project demonstrates collaborative development and AI application in design.

                My Contributions:
                - Frontend interface improvements
                - AI model integration
                - User experience enhancements
                - Bug fixes and optimizations

                The platform makes home redesigning accessible through AI technology, allowing users to visualize changes before implementation.''',
                'github_url': 'https://github.com/vedang18200/redesigner.io',
                'live_url': 'https://redesigner.io',
                'status': 'completed',
                'is_featured': False,
                'technologies': ['HTML', 'JavaScript', 'AI/ML']
            }
        ]

        for project_data in projects_data:
            # Get or create technologies
            tech_names = project_data.pop('technologies', [])
            project, created = Project.objects.get_or_create(
                title=project_data['title'],
                defaults=project_data
            )

            # Add technologies
            for tech_name in tech_names:
                try:
                    tech = Skill.objects.get(name__icontains=tech_name)
                    project.technologies.add(tech)
                except Skill.DoesNotExist:
                    # Create a basic skill if it doesn't exist
                    tech = Skill.objects.create(
                        name=tech_name,
                        category='other',
                        proficiency=70
                    )
                    project.technologies.add(tech)

            if created:
                self.stdout.write(f'Created project: {project.title}')

        self.stdout.write(self.style.SUCCESS('Successfully populated portfolio data!'))

# main/management/commands/create_superuser_auto.py
from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
import os

class Command(BaseCommand):
    help = 'Create superuser automatically'

    def handle(self, *args, **options):
        if not User.objects.filter(username='admin').exists():
            User.objects.create_superuser(
                username='admin',
                email='vedangdeshmukh777@gmail.com',
                password='admin123'
            )
            self.stdout.write(self.style.SUCCESS('Superuser created: admin/admin123'))
        else:
            self.stdout.write('Superuser already exists')

# .env file (create this in your project root)
"""
DEBUG=True
SECRET_KEY=your-very-secret-key-here-change-in-production
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-app-password
"""

# Django project setup script
# setup_portfolio.py
import os
import sys
import subprocess

def run_command(command, description):
    print(f"\n🔄 {description}...")
    try:
        result = subprocess.run(command, shell=True, check=True, capture_output=True, text=True)
        print(f"✅ {description} completed successfully")
        return True
    except subprocess.CalledProcessError as e:
        print(f"❌ Error during {description}: {e}")
        print(f"Output: {e.output}")
        return False

def setup_portfolio():
    print("🚀 Setting up Django Portfolio Website...")

    commands = [
        ("python manage.py makemigrations", "Creating migrations"),
        ("python manage.py migrate", "Applying migrations"),
        ("python manage.py create_superuser_auto", "Creating superuser"),
        ("python manage.py populate_data", "Populating initial data"),
    ]

    for command, description in commands:
        if not run_command(command, description):
            print(f"Setup failed at: {description}")
            return False

    print("\n🎉 Portfolio setup completed successfully!")
    print("\n📋 Next steps:")
    print("1. Run: python manage.py runserver")
    print("2. Visit: http://127.0.0.1:8000")
    print("3. Admin panel: http://127.0.0.1:8000/admin (admin/admin123)")
    print("4. Update your .env file with your email credentials for contact form")
    print("5. Upload your resume file through admin panel")
    print("6. Add your profile image through admin panel")

    return True

if __name__ == "__main__":
    setup_portfolio()
