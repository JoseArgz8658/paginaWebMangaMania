$(document).ready(function () {
  $.ajax({
    url: 'http://127.0.0.1:8000/apis/manga/',
    type: 'GET',
    success: function (data) {
      const container = $('#mangas-container');
      data.forEach(manga => {
        if (manga.titulo_manga !== "") {
          const tarjeta = crearTarjetaManga(manga);
          container.append(tarjeta);
        }
      });
    },
    error: function (error) {
      console.error('Error al cargar mangas desde API:', error);
    }
  });
});

function generarNombreArchivo(titulo_manga) {
  return titulo_manga
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, '')
    .replace(/[^a-zA-Z0-9]/g, '')
    + "tomos.html";
}

function crearTarjetaManga(manga) {
  return $(`
    <div class="col-md-4 mb-4">
      <div class="card h-100 shadow-sm">
        <img class="card-img-top" src="${manga.imagen_portada_v1_manga}" alt="${manga.titulo_manga}">
        <div class="card-body">
          <h5 class="card-title">${manga.titulo_manga}</h5>
          <p class="card-text">Estado: ${manga.estado_manga === 'E' ? 'En emisión' : 'Finalizado'}</p>
          <p class="card-text">Autor: ${manga.autor_manga}</p>
          <p class="card-text">Fecha de publicación: ${manga.fecha_publicacion_manga}</p>
          <a href="/tomos/?manga=${encodeURIComponent(manga.titulo_manga)}" class="btn btn-primary">Ir a los Tomos</a>
        </div>
      </div>
    </div>
  `);
}