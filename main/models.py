# Update your models.py with secure=True parameter

class Profile(models.Model):
    name = models.CharField(max_length=100, default="Vedang Deshmukh")
    tagline = models.CharField(max_length=200, default="Aspiring AIML Student and Developer")
    bio = models.TextField(default="I am a second-year Computer Science student specializing in Artificial Intelligence and Machine Learning.")

    # UPDATED: Add secure=True for HTTPS URLs
    profile_image = CloudinaryField(
        'image',
        blank=True,
        null=True,
        transformation={
            'width': 500,
            'height': 500,
            'crop': 'fill',
            'gravity': 'face',
            'quality': 'auto',
            'format': 'webp'
        },
        folder='portfolio/profile',
        secure=True  # ADD THIS LINE
    )

    email = models.EmailField(default="vedangdeshmukh777@gmail.com")
    github_url = models.URLField(default="https://github.com/vedang18200")
    linkedin_url = models.URLField(blank=True)
    twitter_url = models.URLField(blank=True)
    location = models.CharField(max_length=100, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "Profile"

class Project(models.Model):
    PROJECT_STATUS = [
        ('completed', 'Completed'),
        ('in_progress', 'In Progress'),
        ('planned', 'Planned'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=200)
    short_description = models.CharField(max_length=250, help_text="Brief description for cards")
    description = models.TextField(help_text="Detailed project description")

    # UPDATED: Add secure=True for HTTPS URLs
    image = CloudinaryField(
        'image',
        blank=True,
        null=True,
        transformation={
            'width': 800,
            'height': 600,
            'crop': 'fill',
            'quality': 'auto',
            'format': 'webp'
        },
        folder='portfolio/projects',
        secure=True  # ADD THIS LINE
    )

    github_url = models.URLField(blank=True, validators=[URLValidator()])
    live_url = models.URLField(blank=True, validators=[URLValidator()], help_text="Live demo URL")
    technologies = models.ManyToManyField(Skill, blank=True, related_name='projects')
    status = models.CharField(max_length=20, choices=PROJECT_STATUS, default='completed')
    is_featured = models.BooleanField(default=False, help_text="Show on main page")
    order = models.PositiveIntegerField(default=0, help_text="Display order")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-is_featured', 'order', '-created_at']

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        return reverse('project_detail', kwargs={'pk': self.pk})

class Resume(models.Model):
    title = models.CharField(max_length=100, default="My Resume")

    # UPDATED: Add secure=True for HTTPS URLs
    file = CloudinaryField(
        'raw',
        resource_type='raw',
        folder='portfolio/documents',
        allowed_formats=['pdf', 'doc', 'docx'],
        secure=True  # ADD THIS LINE
    )

    is_active = models.BooleanField(default=True, help_text="Currently active resume")
    uploaded_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-uploaded_at']

    def __str__(self):
        return f"{self.title} - {self.uploaded_at.strftime('%Y-%m-%d')}"

    def save(self, *args, **kwargs):
        if self.is_active:
            # Set all other resumes to inactive
            Resume.objects.filter(is_active=True).update(is_active=False)
        super().save(*args, **kwargs)
