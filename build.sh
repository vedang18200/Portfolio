#!/usr/bin/env bash
# exit on error
set -o errexit

# Upgrade pip and install build tools first
pip install --upgrade pip setuptools wheel

# Install requirements
pip install -r requirements.txt

# Run Django management commands
python manage.py collectstatic --no-input
python manage.py migrate
