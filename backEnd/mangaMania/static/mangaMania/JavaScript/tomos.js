document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const titulo = params.get("manga");

  if (!titulo) {
    document.getElementById("info-manga").innerHTML = "<div class='alert alert-danger'>No se proporcionó ningún manga.</div>";
    return;
  }

  fetch('http://127.0.0.1:8000/apis/manga/')
    .then(res => res.json())
    .then(data => {
      const manga = data.find(m => m.titulo_manga === titulo);
      if (!manga) {
        document.getElementById("info-manga").innerHTML = `<div class="alert alert-warning">No se encontró el manga: ${titulo}</div>`;
        return;
      }

      // Mostrar información del manga
      const contenido = `
        <div class="card mb-4">
          <div class="row g-0">
            <div class="col-md-4 text-center p-3">
              <img src="${manga.imagen_portada_v1_manga}" class="img-fluid mt-3" alt="${manga.titulo_manga}">
              <img src="${manga.imagen_titulo_logo_manga}" class="img-fluid rounded-start mt-3" alt="Logo de ${manga.titulo_manga}">
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h2 class="card-title">${manga.titulo_manga}</h2>
                <p class="card-text"><strong>Estado:</strong> ${manga.estado_manga === 'E' ? 'En emisión' : 'Finalizado'}</p>
                <p class="card-text"><strong>Fecha de publicación:</strong> ${manga.fecha_publicacion_manga}</p>
                <hr>
                <h4>Descripción</h4>
                <p>${manga.descripcion_manga}</p>
                <h4>Introducción</h4>
                <p>${manga.introduccion_manga ? manga.introduccion_manga.replace(/\n/g, "<br>") : ''}</p>
              </div>
            </div>
          </div>
        </div>
      `;

      document.getElementById("info-manga").innerHTML = contenido;

      fetch(`http://127.0.0.1:8000/apis/tomo/?manga=${manga.id_manga}`)
        .then(res => res.json())
        .then(tomos => {
          const tablaBody = document.getElementById("tabla-tomos-body");
          if (tomos.length === 0) {
            tablaBody.innerHTML = "<tr><td colspan='5'>No hay tomos disponibles para este manga.</td></tr>";
            return;
          }

          let filas = "";
          tomos.forEach((tomo, index) => {
            filas += `
              <tr>
                <td>${tomo.numero_tomo}</td>
                <td>${tomo.titulo_tomo}</td>
                <td>${tomo.descripcion_tomo}</td>
                <td>${tomo.fecha_publicacion_tomo}</td>
                <td><a href="${tomo.archivo_pdf}" class="btn btn-sm btn-primary" target="_blank">Ver PDF</a></td>
              </tr>
            `;
          });

          tablaBody.innerHTML = filas;
        })
        .catch(err => {
          console.error("Error al cargar los tomos:", err);
          const tablaBody = document.getElementById("tabla-tomos-body");
          tablaBody.innerHTML = "<tr><td colspan='5'>Error al cargar los tomos.</td></tr>";
        });

    })
    .catch(err => {
      console.error("Error al cargar el manga:", err);
      document.getElementById("info-manga").innerHTML = "<div class='alert alert-danger'>Error al cargar el manga.</div>";
    });
});