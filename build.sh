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
