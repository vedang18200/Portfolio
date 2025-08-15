
# main/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('about/', views.about, name='about'),
    path('projects/', views.projects, name='projects'),
    path('projects/<uuid:pk>/', views.ProjectDetailView.as_view(), name='project_detail'),
    path('contact/', views.contact, name='contact'),
    path('resume/download/', views.download_resume, name='download_resume'),
    path('api/skills/', views.skills_api, name='skills_api'),
    path('api/search-projects/', views.search_projects, name='search_projects'),
]
