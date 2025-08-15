# Step-by-step migration process

# 1. First, make sure your environment variables are set
echo "Checking environment variables..."
echo "CLOUDINARY_CLOUD_NAME: $CLOUDINARY_CLOUD_NAME"
echo "CLOUDINARY_API_KEY: $CLOUDINARY_API_KEY"
echo "CLOUDINARY_API_SECRET: $CLOUDINARY_API_SECRET"

# 2. Create migrations for the model changes
echo "Creating migrations..."
python manage.py makemigrations main --name="switch_to_cloudinary"

# 3. Run the migrations
echo "Running migrations..."
python manage.py migrate

# 4. Collect static files
echo "Collecting static files..."
python manage.py collectstatic --noinput

# 5. Create superuser if needed
echo "Creating superuser (if needed)..."
python manage.py createsuperuser

# 6. Check if everything is working
echo "Testing database connection..."
python manage.py shell -c "
from main.models import Profile, Project, Skill
print(f'Profiles: {Profile.objects.count()}')
print(f'Projects: {Project.objects.count()}')
print(f'Skills: {Skill.objects.count()}')
print('Migration successful!')
"
