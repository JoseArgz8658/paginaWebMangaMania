from django.urls import path, include
from rest_framework.routers import DefaultRouter

from . import views
from .views import MangaViewSet, TomoViewSet

router = DefaultRouter()

router.register('manga', MangaViewSet)
router.register('tomo', TomoViewSet)

urlpatterns = [
    path('', views.index, name='index'),
    path('mangas/', views.page_manga, name='pageManga'),
    path('categorias/', views.page_categoria, name='pageCategoria'),
    path('populares/', views.page_popular, name='pagePopular'),
    path('suscripciones/', views.page_suscripcion, name='pageSuscripcion'),
    path('registro/', views.page_registro, name='registro'),
    path('inicioSesion/', views.page_inicioSesion, name='inicioSesion'),
    path('recuperarContra/', views.page_recuperarContra, name='recuperarContra'),
    path('tomos/', views.page_tomo, name='tomos'),
    path('apis/', include(router.urls)),

]