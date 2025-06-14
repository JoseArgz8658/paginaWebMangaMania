document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('searchForm');
  const input = document.getElementById('searchInput');
  const resultContainer = document.getElementById('resultContainer');
  const url = "http://127.0.0.1:8000/apis/manga/";

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const query = input.value.toLowerCase().trim();
    resultContainer.innerHTML = '';

    if (!query) {
      resultContainer.innerHTML = '<p class="text-danger">Por favor, escribe algo para buscar.</p>';
      return;
    }

    try {
      const res = await fetch(url);
      const mangas = await res.json();

      const resultados = mangas.filter(manga =>
        manga.titulo_manga.toLowerCase().includes(query)
      );

      if (resultados.length === 0) {
        resultContainer.innerHTML = '<p class="text-warning">No se encontraron mangas con ese título.</p>';
      } else {
        const fragment = document.createDocumentFragment();
        resultados.forEach(manga => {
          const resultHTML = document.createElement('div');
          resultHTML.classList.add('list-group');
          resultHTML.innerHTML = `
            <a href="/tomos/?manga=${encodeURIComponent(manga.titulo_manga)}" class="list-group-item list-group-item-action">${manga.titulo_manga}</a>
          `;
          fragment.appendChild(resultHTML);
        });
        resultContainer.appendChild(fragment);
      }
    } catch (error) {
      console.error("Error al cargar los mangas:", error);
      resultContainer.innerHTML = '<p class="text-danger">Error al obtener los mangas. Intenta más tarde.</p>';
    }
  })

  document.addEventListener('click', (e) => {
    if (!resultContainer.contains(e.target) && e.target !== input) {
      resultContainer.innerHTML = '';
    }
  });

});