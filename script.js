document.addEventListener("DOMContentLoaded", () => {
    const contenedorPeliculas = document.querySelector(".movie-list");
    const contenedorDestacada = document.querySelector(".featured");
    const mensajeSinResultados = document.getElementById("mensaje-sin-resultados");

    // Cargar película destacada
    fetch("destacada.json")
        .then(response => response.json())
        .then(data => {
            contenedorDestacada.innerHTML = `
                <img src="${data.imagen}" alt="${data.titulo}">
                <h2>${data.titulo}</h2>
                <div style="display:flex; justify-content:center; gap:10px;">
                    ${data.botones.map(texto => `<button>${texto}</button>`).join('')}
                </div>
            `;
        })
        .catch(error => console.error("Error al cargar la película destacada:", error));

    // Cargar todas las películas al inicio
    fetch("peliculas.json")
        .then(response => response.json())
        .then(data => renderPeliculas(data))
        .catch(error => console.error("Error al cargar películas:", error));

    // Botón: aplicar filtros
    document.getElementById("btn-filtros").addEventListener("click", () => {
        const categoriasSeleccionadas = [];
        const idiomasSeleccionados = [];
        let salaSeleccionada = "";

        document.querySelectorAll(".group:nth-child(1) input[type='checkbox']").forEach(cb => {
            if (cb.checked) categoriasSeleccionadas.push(cb.parentElement.textContent.trim());
        });

        document.querySelectorAll(".group:nth-child(2) input[type='checkbox']").forEach(cb => {
            if (cb.checked) idiomasSeleccionados.push(cb.parentElement.textContent.trim());
        });

        document.querySelectorAll(".group:nth-child(3) input[type='radio']").forEach(rb => {
            if (rb.checked) salaSeleccionada = rb.parentElement.textContent.trim();
        });

        fetch("peliculas.json")
            .then(response => response.json())
            .then(data => {
                const filtradas = data.filter(pelicula => {
                    const cumpleCategoria = categoriasSeleccionadas.length === 0 || categoriasSeleccionadas.includes(pelicula.categoria);
                    const cumpleIdioma = idiomasSeleccionados.length === 0 || idiomasSeleccionados.some(idioma => pelicula.idioma.includes(idioma));
                    const cumpleSala = salaSeleccionada === "" || pelicula.sala.includes(salaSeleccionada);
                    return cumpleCategoria && cumpleIdioma && cumpleSala;
                });
                renderPeliculas(filtradas);
            })
            .catch(error => console.error("Error al filtrar películas:", error));
    });

    // Botón: limpiar filtros
    document.getElementById("btn-limpiar").addEventListener("click", () => {
        document.querySelectorAll("input[type='checkbox'], input[type='radio']").forEach(input => input.checked = false);
        mensajeSinResultados.style.display = "none";
        fetch("peliculas.json")
            .then(res => res.json())
            .then(data => renderPeliculas(data));
    });

    // Función para mostrar las películas
    function renderPeliculas(lista) {
        contenedorPeliculas.innerHTML = "";
        if (lista.length === 0) {
            mensajeSinResultados.style.display = "block";
        } else {
            mensajeSinResultados.style.display = "none";
            lista.forEach(pelicula => {
                const div = document.createElement("div");
                div.classList.add("movie");
                div.innerHTML = `
                    <img src="${pelicula.imagen}" alt="${pelicula.titulo}">
                    <h3>${pelicula.titulo}</h3>
                    <p>Sala: ${pelicula.sala.join(", ")}</p>
                    <button>Comprar Boletos</button>
                `;
                contenedorPeliculas.appendChild(div);
            });
        }
    }
});
