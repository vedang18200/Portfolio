# Simple Cloudinary check script
# Save as: check_cloudinary.py in your project root

import os

# First check if you have the required packages
try:
    import cloudinary
    import cloudinary.api
    print("✅ Cloudinary package installed")
except ImportError:
    print("❌ Cloudinary package not installed. Run: pip install cloudinary")
    exit(1)

def check_cloudinary_config():
    print("🔍 Checking Cloudinary Configuration...")
    print("=" * 50)

    # Check environment variables
    cloud_name = 'dpdwqsmsa'
    api_key = '748842936887498'
    api_secret = 'LlE0gR00Snm0FnDEqlPh7hkg3TM'

    print(f"CLOUDINARY_CLOUD_NAME: {'✅ SET' if cloud_name else '❌ NOT SET'}")
    print(f"CLOUDINARY_API_KEY: {'✅ SET' if api_key else '❌ NOT SET'}")
    print(f"CLOUDINARY_API_SECRET: {'✅ SET' if api_secret else '❌ NOT SET'}")

    if not all([cloud_name, api_key, api_secret]):
        print("\n❌ PROBLEM FOUND: Missing Cloudinary credentials!")
        print("This is why your images are being stored locally and disappearing.")
        print("\nSOLUTION:")
        print("1. Go to your Render dashboard")
        print("2. Go to your service settings")
        print("3. Add these environment variables:")
        print("   - CLOUDINARY_CLOUD_NAME")
        print("   - CLOUDINARY_API_KEY")
        print("   - CLOUDINARY_API_SECRET")
        print("4. Get these values from https://cloudinary.com/console")
        return False

    # Test Cloudinary connection
    try:
        import cloudinary
        import cloudinary.api

        cloudinary.config(
            cloud_name=cloud_name,
            api_key=api_key,
            api_secret=api_secret,
            secure=True
        )

        result = cloudinary.api.ping()
        print(f"\n✅ Cloudinary connection successful!")
        print(f"Status: {result.get('status', 'unknown')}")

        # Check storage configuration
        print(f"\nDjango Storage Settings:")
        print(f"DEFAULT_FILE_STORAGE: {getattr(settings, 'DEFAULT_FILE_STORAGE', 'Not set')}")

        return True

    except Exception as e:
        print(f"\n❌ Cloudinary connection failed: {e}")
        return False

def check_existing_images():
    print("\n🖼️  Checking Existing Images...")
    print("=" * 50)

    from main.models import Profile, Project

    # Check profiles
    profiles = Profile.objects.all()
    for profile in profiles:
        if profile.profile_image:
            url = str(profile.profile_image.url)
            is_cloudinary = 'cloudinary.com' in url
            print(f"Profile '{profile.name}':")
            print(f"  Image URL: {url}")
            print(f"  Storage: {'✅ Cloudinary' if is_cloudinary else '❌ Local (will disappear!)'}")
        else:
            print(f"Profile '{profile.name}': No image")

    # Check projects
    projects = Project.objects.all()
    for project in projects:
        if project.image:
            url = str(project.image.url)
            is_cloudinary = 'cloudinary.com' in url
            print(f"Project '{project.title}':")
            print(f"  Image URL: {url}")
            print(f"  Storage: {'✅ Cloudinary' if is_cloudinary else '❌ Local (will disappear!)'}")

if __name__ == "__main__":
    config_ok = check_cloudinary_config()

    if config_ok:
        check_existing_images()
        print("\n✅ Configuration looks good!")
        print("If images are still disappearing:")
        print("1. Re-upload them through Django admin")
        print("2. They should now be stored in Cloudinary")
    else:
        print("\n❌ Fix Cloudinary configuration first!")
        print("Render is not the problem - missing Cloudinary setup is.")
