from django.contrib import admin

# Register your models here.
from .models import Manga, Tomo

@admin.register(Manga)
class MangaAdmin(admin.ModelAdmin):
    list_display = ('titulo_manga', 'autor_manga', 'fecha_publicacion_manga', 'estado_manga')

admin.site.register(Tomo)