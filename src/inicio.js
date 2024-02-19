import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyCyHr3QmcPsP8BjeUpZLPQ6FkjlLB_v7JU",
    authDomain: "db-tecnicusuarios.firebaseapp.com",
    projectId: "db-tecnicusuarios",
    storageBucket: "db-tecnicusuarios.appspot.com",
    messagingSenderId: "500178473738",
    appId: "1:500178473738:web:916af8899ffcef0a5420f3"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
    if (!user) {
        console.log("Usuario no autenticado. Redirigiendo a la página de inicio.");
        window.location.href = 'error.html';
    }
});

// Función para cerrar sesión y redirigir a index.html
const cerrarSesion = () => {
    signOut(auth)
        .then(() => {
            console.log('Sesión cerrada exitosamente.');
            window.location.href = 'index.html';
        })
        .catch((error) => {
            console.error('Error al cerrar sesión:', error);
        });
};

// Función para mostrar información sobre el usuario actual
const mostrarUsuarioActual = () => {
    const user = auth.currentUser;
    if (user) {
        console.log('Usuario actual:', user);
    } else {
        console.log('Ningún usuario autenticado.');
    }
};

// Asignar evento onclick utilizando addEventListener
document.addEventListener('DOMContentLoaded', function () {
document.getElementById('cerrar-sesion-btn').addEventListener('click', cerrarSesion);
});


let fecha = new Date();
let fechaActual = fecha.toLocaleDateString();
document.getElementById("fecha").textContent = fechaActual;
function mueveReloj(){
    momentoActual = new Date()
    hora = momentoActual.getHours()
    minuto = momentoActual.getMinutes()
    horaImprimible = hora + " : " + minuto + " : "
    document.form_reloj.reloj.value = horaImprimible
    setTimeout("mueveReloj()",1000)
}
document.addEventListener('DOMContentLoaded', function () {
    const avatarBtn = document.querySelector('.avatar-btn');
    const linksDiv = document.querySelector('.links');

    avatarBtn.addEventListener('click', function (event) {
        event.stopPropagation(); // Detener la propagación del evento clic
        linksDiv.classList.toggle('show');
    });
  });

  // JavaScript para cerrar los enlaces al hacer clic en cualquier parte de la pantalla
  document.addEventListener('click', function(event) {
    // Verificar si el elemento clickeado no es un enlace
    var linksDiv = document.querySelector('.links');
    if (!linksDiv.contains(event.target)) {
      // Si el clic no fue dentro de los enlaces, se ocultan los enlaces
      linksDiv.classList.remove('show'); // Remover la clase 'show' para ocultar los enlaces
    }
  });

