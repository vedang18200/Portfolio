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

# Check Cloudinary environment variables
echo "🔍 Checking Cloudinary configuration..."
if [ -z "$CLOUDINARY_CLOUD_NAME" ] || [ -z "$CLOUDINARY_API_KEY" ] || [ -z "$CLOUDINARY_API_SECRET" ]; then
    echo "⚠️  WARNING: Cloudinary environment variables not fully set!"
    echo "   CLOUDINARY_CLOUD_NAME: ${CLOUDINARY_CLOUD_NAME:-'NOT SET'}"
    echo "   CLOUDINARY_API_KEY: ${CLOUDINARY_API_KEY:+SET}"
    echo "   CLOUDINARY_API_SECRET: ${CLOUDINARY_API_SECRET:+SET}"
else
    echo "✅ Cloudinary environment variables configured"
fi

# Create migrations for Cloudinary (if needed)
echo "🔧 Creating migrations..."
python manage.py makemigrations main --name="switch_to_cloudinary" || echo "⚠️ No new migrations created (this is OK if already exists)"

# Run Django management commands
echo "📁 Collecting static files..."
python manage.py collectstatic --no-input

echo "⚙️ Running database migrations..."
python manage.py migrate

echo "👤 Creating superuser..."
python manage.py create_superuser_auto

echo "📊 Populating initial data..."
python manage.py populate_data

# Test database connection
echo "🔍 Testing database connection..."
python manage.py shell -c "
from main.models import Profile, Project, Skill
print(f'✅ Profiles: {Profile.objects.count()}')
print(f'✅ Projects: {Project.objects.count()}')
print(f'✅ Skills: {Skill.objects.count()}')
" || echo "⚠️ Database test failed (this might be normal on first deploy)"

echo "🎉 Build completed successfully!"
echo "📝 Remember to re-upload images through Django admin after first deployment"
