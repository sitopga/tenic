
function mostrarSlider2() {
    document.getElementById("sliderContainer").style.display = "none"; // Oculta el primer slider
    document.getElementById("slider2").style.display = "block"; // Muestra el segundo slider
}


let currentIndex = 0;
const slides = document.querySelectorAll('.slide-section');

function nextSlide() {
  currentIndex = (currentIndex + 1) % slides.length;
  updateSlider();
}
function netSlide() {
    currentIndex = 0; // Establecer currentIndex en 0 para ir al primer slide
    updateSlider();
}


function prevSlide() {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  updateSlider();
}

function updateSlider() {
  const slider = document.getElementById('slider');
  const offset = -currentIndex * 100;
  slider.style.transform = `translateX(${offset}%)`;
}

// abrir slider 
const toggleButton = document.getElementById('abrirSlider');
toggleButton.addEventListener('click', function() {
    const sliderContainer = document.getElementById('sliderContainer');
    sliderContainer.style.display = 'block';
    // Desactivar el scroll
    document.body.style.overflow = 'hidden';
});

const closeButtonList = document.querySelectorAll('.cerrar-slider-btn');

// Agregar evento de clic a cada botón
closeButtonList.forEach(button => {
    button.addEventListener('click', function() {
        // Ocultar el contenedor del slider
        const sliderContainer = document.getElementById('sliderContainer');
        sliderContainer.style.display = 'none';
        
        // Reactivar el scroll
        document.body.style.overflow = 'auto';
    });
});


function mostrarModal(idModal) {
    var modal = document.getElementById(idModal);
    modal.style.display = 'flex';
}

function ocultarModal(idModal) {
    var modal = document.getElementById(idModal);
    modal.style.display = 'none';
}

window.onscroll = function() {
    // Evitar cambios en el scroll mientras el slider está abierto
    if (document.getElementById('sliderContainer').style.display !== 'block') {
        mostrarOcultarBoton();
    }
};

function mostrarOcultarBoton() {
    var botonIrArriba = document.getElementById("irArribaBtn");
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        botonIrArriba.style.display = "block";
    } else {
        botonIrArriba.style.display = "none";
    }
}

function irArriba() {
    document.body.scrollTop = 0; 
    document.documentElement.scrollTop = 0; 
}

// nuevo aporte 
window.onscroll = function() {
    mostrarOcultarBoton();
};

 function mostrarOcultarBoton() {
    var botonIrArriba = document.getElementById("irArribaBtn");
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        botonIrArriba.style.display = "block";
    } else {
        botonIrArriba.style.display = "none";
    }
}

function irArriba() {
    document.body.scrollTop = 0; // Para navegadores antiguos
    document.documentElement.scrollTop = 0; // Para navegadores modernos
}
const buscador = document.getElementById('averias');

if (buscador) {
const opciones = document.querySelectorAll('#listaaverias option');
const divs = document.querySelectorAll('div[id^="No-"], div[id^="Salta-"], div[id^="Escudos-"], div[id^="Perdida-"]');

function mostrarDiv(seleccionado) {
    divs.forEach(div => {
        div.style.display = 'none';
    });
    const divMostrar = document.getElementById(seleccionado.replace(/ /g, '-'));
    if (divMostrar) {
        divMostrar.style.display = 'block';
        divMostrar.scrollIntoView();
    }
}

function abrirCorrectivoNoEnfria() {
    // Aquí implementas la lógica para abrir el correctivo de 'No enfria'
    alert("Implementa la lógica para abrir el correctivo de 'No enfria'");
}

buscador.addEventListener('input', function(e) {
    const valorBusqueda = this.value.toLowerCase();
    if (valorBusqueda === '') {
        divs.forEach(div => {
            div.style.display = 'block';
        });
    } else {
        opciones.forEach(opcion => {
            if (opcion.value.toLowerCase() === valorBusqueda) {
                mostrarDiv(opcion.value);
            }
        });
    }
});

buscador.addEventListener('change', function() {
    mostrarDiv(this.value);
});

buscador.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && this.value === '') {
        e.preventDefault(); // Evita la acción predeterminada (submit)
    }
});

document.addEventListener('click', function(e) {
    if (!buscador.contains(e.target)) {
        // Si el clic no fue dentro del buscador
        // Aquí puedes realizar las acciones necesarias, por ejemplo, mostrar todos los divs nuevamente
        divs.forEach(div => {
            div.style.display = 'block';
        });
    }
});
} else {
console.error("El elemento con el ID 'averias' no se encontró en el DOM.");
}




