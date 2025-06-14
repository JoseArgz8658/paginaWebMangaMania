from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from .models import Manga, Tomo
from .serializers import MangaSerializer, TomoSerializer
from django_filters.rest_framework import DjangoFilterBackend

def index(request):
    return render(request, 'mangaMania/index.html')

def page_manga(request):
    return render(request, 'mangaMania/pageManga.html')

def page_categoria(request):
    return render(request, 'mangaMania/pageCategoria.html')

def page_popular(request):
    return render(request, 'mangaMania/pagePopular.html')

def page_suscripcion(request):
    return render(request, 'mangaMania/pageSuscripcion.html')

def page_inicioSesion(request):
    return render(request, 'mangaMania/inicioSesion.html')

def page_registro(request):
    return render(request, 'mangaMania/registro.html')

def page_recuperarContra(request):
    return render(request, 'mangaMania/recuperarContra.html')

def page_tomo(request):
    return render(request, 'mangaMania/tomos.html')

class MangaViewSet(viewsets.ModelViewSet):
    queryset = Manga.objects.all()
    serializer_class = MangaSerializer

class TomoViewSet(viewsets.ModelViewSet):
    queryset = Tomo.objects.all()
    serializer_class = TomoSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['manga']