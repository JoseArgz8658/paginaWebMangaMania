from rest_framework import serializers
from .models import Manga, Tomo
from django.contrib.auth.models import User

class MangaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Manga
        fields = '__all__'

class TomoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tomo
        fields = '__all__'