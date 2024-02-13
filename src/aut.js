onAuthStateChanged(auth, (user) => {
    if (!user) {
        console.log("Usuario no autenticado. Redirigiendo a la página de inicio.");
        window.location.href = 'error.html';
    }
});


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
