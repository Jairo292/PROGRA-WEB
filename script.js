// Cargar película destacada
async function cargarPeliculaDestacada() {
    try {
      const response = await fetch('destacada.json');
      const pelicula = await response.json();
  
      const contenedorDestacada = document.getElementById('peliculaDestacada');
      contenedorDestacada.innerHTML = `
        <img src="${pelicula.imagen}" alt="${pelicula.titulo}" style="width: 100%; border-radius: 8px; margin-bottom: 10px;">
        <h2>${pelicula.titulo}</h2>
        <div style="margin-top: 10px;">
          <button class="boton-principal" onclick="reservarPelicula('${pelicula.titulo}')">Reservar Ahora</button>

          <button onclick="verTrailer('${pelicula.trailer}')">Ver Tráiler</button>
        </div>
      `;
    } catch (error) {
      console.error('Error al cargar la película destacada:', error);
    }
  }
  
  // Cargar lista de películas
  async function cargarPeliculas() {
    try {
      const response = await fetch('peliculas.json');
      const peliculas = await response.json();
  
      const listaPeliculas = document.getElementById('listaPeliculas');
      listaPeliculas.innerHTML = '';
  
      peliculas.forEach(pelicula => {
        const peliculaDiv = document.createElement('div');
        peliculaDiv.className = 'pelicula';
        peliculaDiv.innerHTML = `
          <img src="${pelicula.imagen}" alt="${pelicula.titulo}">
          <h3>${pelicula.titulo}</h3>
          <p>Sala: ${pelicula.sala.join(', ')}</p>
          <button onclick="comprarBoletos('${pelicula.titulo}')">Comprar Boletos</button>
        `;
        listaPeliculas.appendChild(peliculaDiv);
      });
    } catch (error) {
      console.error('Error al cargar las películas:', error);
    }
  }
 // Funciones de interacción
function reservarPelicula(titulo) {
    alert(`Reservaste boletos para: ${titulo}`);
  }
  
  function verTrailer(url) {
    window.open(url, '_blank');
  }
  
  function comprarBoletos(titulo) {
    alert(`Comprar boletos para: ${titulo}`);
  }
  
  // Funciones para filtros
  document.getElementById('aplicarFiltros').addEventListener('click', () => {
    alert('Filtros aplicados (funcionalidad por desarrollar).');
  });
  
  document.getElementById('limpiarFiltros').addEventListener('click', () => {
    document.querySelectorAll('input[type=checkbox]').forEach(checkbox => checkbox.checked = false);
    alert('Filtros limpiados.');
  });
 // Menú hamburguesa
const menuHamburguesa = document.getElementById('menuHamburguesa');
const navLinks = document.getElementById('navLinks');

menuHamburguesa.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Inicializar página cargando datos
cargarPeliculaDestacada();
cargarPeliculas();
  

// Menú desplegable del usuario
const userIcon = document.getElementById('userIcon');
const userMenu = document.getElementById('userMenu');

userIcon.addEventListener('click', (e) => {
  e.preventDefault();
  userMenu.style.display = userMenu.style.display === 'flex' ? 'none' : 'flex';
});

// Opciones del menú
const toggleDarkMode = document.getElementById('toggleDarkMode');
const toggleVoice = document.getElementById('toggleVoice');

toggleDarkMode.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
});

toggleVoice.addEventListener('click', () => {
  alert('Modo de lectura activado (simulado).');
});

// (Opcional) Cerrar el menú al hacer clic afuera
document.addEventListener('click', (e) => {
  if (!userIcon.contains(e.target) && !userMenu.contains(e.target)) {
    userMenu.style.display = 'none';
  }
});
