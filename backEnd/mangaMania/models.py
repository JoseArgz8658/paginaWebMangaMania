from django.db import models

# Create your models here.
import uuid
from django.core.exceptions import ValidationError

class Manga(models.Model):
    ESTADOS = [
        ('E', 'En emisión'),
        ('F', 'Finalizado'),
    ]

    id_manga = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    titulo_manga = models.CharField(max_length=100)
    autor_manga = models.CharField(max_length=50)
    fecha_publicacion_manga = models.DateField()
    descripcion_manga = models.TextField()
    estado_manga = models.CharField(max_length=1, choices=ESTADOS)
    introduccion_manga = models.TextField(blank=True, null=True)
    imagen_portada_v1_manga = models.ImageField(upload_to='mangas/portadaV1/', null=True, blank=True)
    imagen_titulo_logo_manga = models.ImageField(upload_to='mangas/tituloLogo/', null=True, blank=True)
    imagen_portada_anime_manga = models.ImageField(upload_to='mangas/portadaAnime/', null=True, blank=True)

    def __str__(self):
        return f'{self.titulo_manga} by {self.autor_manga} - {self.estado_manga}'
    
    @property
    def cantidad_tomos(self):
        return self.tomos.count()
    
class Tomo(models.Model):
    id_tomo = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    manga = models.ForeignKey(Manga, on_delete=models.CASCADE, related_name='tomos')
    numero_tomo = models.PositiveIntegerField()
    titulo_tomo = models.CharField(max_length=100)
    descripcion_tomo = models.TextField(blank=True, null=True)
    archivo_pdf = models.FileField(upload_to='tomos/pdfs/')
    fecha_subida = models.DateTimeField(auto_now_add=True)
    fecha_publicacion_tomo = models.DateField(null=True, blank=True)

    def __str__(self):
        return f'{self.manga.titulo_manga} - Tomo N°{self.numero_tomo}'
    
    def clean(self):
        if self.numero_tomo < 1:
            raise ValidationError("El número de tomo debe ser mayor a cero.")
        
    class Meta:
        ordering = ['manga', 'numero_tomo']