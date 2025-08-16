#!/usr/bin/env bash
# exit on error
set -o errexit

echo "🚀 Starting build process..."

# Upgrade pip and install build tools first
echo "📦 Upgrading pip and build tools..."
pip install --upgrade pip setuptools wheel

# Install requirements
echo "📋 Installing requirements..."
pip install -r requirements.txt

# Check Cloudinary environment variables - CRITICAL CHECK
echo "🔍 Checking Cloudinary configuration..."
if [ -z "$CLOUDINARY_CLOUD_NAME" ] || [ -z "$CLOUDINARY_API_KEY" ] || [ -z "$CLOUDINARY_API_SECRET" ]; then
    echo "❌ ERROR: Cloudinary environment variables not fully set!"
    echo "   CLOUDINARY_CLOUD_NAME: ${CLOUDINARY_CLOUD_NAME:-'NOT SET'}"
    echo "   CLOUDINARY_API_KEY: ${CLOUDINARY_API_KEY:+SET}"
    echo "   CLOUDINARY_API_SECRET: ${CLOUDINARY_API_SECRET:+SET}"
    echo ""
    echo "⚠️  WITHOUT CLOUDINARY CONFIG, IMAGES WILL BE LOST ON EACH DEPLOYMENT!"
    echo "   Please set these environment variables in your Render dashboard."
    echo ""
else
    echo "✅ Cloudinary environment variables configured"

    # Test Cloudinary connection
    echo "🔗 Testing Cloudinary connection..."
    python -c "
import cloudinary
import cloudinary.api
import os
cloudinary.config(
    cloud_name=os.environ.get('CLOUDINARY_CLOUD_NAME'),
    api_key=os.environ.get('CLOUDINARY_API_KEY'),
    api_secret=os.environ.get('CLOUDINARY_API_SECRET'),
    secure=True
)
try:
    result = cloudinary.api.ping()
    print('✅ Cloudinary connection successful!')
    print(f'   Status: {result.get(\"status\", \"unknown\")}')
except Exception as e:
    print(f'❌ Cloudinary connection failed: {e}')
    print('   Images may not persist between deployments!')
" || echo "⚠️ Could not test Cloudinary connection"
fi

# Create migrations with non-interactive mode
echo "🔧 Creating migrations..."
python manage.py makemigrations --noinput --merge || echo "⚠️ No new migrations created (this is OK if already exists)"

# Specifically create main app migrations if needed
python manage.py makemigrations main --noinput || echo "⚠️ No main app migrations needed"

# Run Django management commands
echo "📁 Collecting static files..."
python manage.py collectstatic --noinput

echo "⚙️ Running database migrations..."
python manage.py migrate --noinput

# Check if superuser creation script exists, if not skip
echo "👤 Creating superuser..."
if python manage.py help create_superuser_auto >/dev/null 2>&1; then
    python manage.py create_superuser_auto
else
    echo "⚠️ create_superuser_auto command not found, skipping..."
fi

# Check if populate data script exists, if not skip
echo "📊 Populating initial data..."
if python manage.py help populate_data >/dev/null 2>&1; then
    python manage.py populate_data
else
    echo "⚠️ populate_data command not found, skipping..."
fi

# NEW: Check existing images and their storage
echo "🖼️  Checking image storage..."
if python manage.py help fix_cloudinary_images >/dev/null 2>&1; then
    python manage.py fix_cloudinary_images
else
    echo "⚠️ fix_cloudinary_images command not found, skipping image check..."
fi

# Test database connection
echo "🔍 Testing database connection..."
python manage.py shell -c "
from main.models import Profile, Project, Skill
print(f'✅ Profiles: {Profile.objects.count()}')
print(f'✅ Projects: {Project.objects.count()}')
print(f'✅ Skills: {Skill.objects.count()}')

# Check if any objects have images
profiles_with_images = Profile.objects.exclude(profile_image='').count()
projects_with_images = Project.objects.exclude(image='').count()
print(f'📸 Profiles with images: {profiles_with_images}')
print(f'📸 Projects with images: {projects_with_images}')
" || echo "⚠️ Database test failed (this might be normal on first deploy)"

echo "🎉 Build completed successfully!"
echo ""
echo "📝 IMPORTANT REMINDERS:"
echo "   1. All images should be uploaded through Django Admin (/admin/)"
echo "   2. Images are stored in Cloudinary and will persist between deployments"
echo "   3. If images disappear, check Cloudinary environment variables"
echo "   4. Re-upload any missing images through the admin interface"
