
// Verificar el estado de inicio de sesión al cargar la página
window.onload = function () {
    const loggedIn = sessionStorage.getItem('loggedIn');
    if (!loggedIn || loggedIn !== 'true') {
        // Si no ha iniciado sesión, redirigir a index.html
        window.location.href = 'index.html';
    }
};

// Verificar el estado de inicio de sesión al intentar acceder directamente a inicio.html
if (window.location.href.includes("inicio.html")) {
    const loggedIn = sessionStorage.getItem('loggedIn');
    if (!loggedIn || loggedIn !== 'true') {
        // Si no ha iniciado sesión, redirigir a index.html
        window.location.href = 'index.html';
    } else {
        // Obtener usuarios del localStorage
        const users = JSON.parse(localStorage.getItem('users')) || [];

        // Autocompletar campos de usuario y contraseña con valores correctos (si es necesario)
        const correctUser = 'usuarioCorrecto';
        const correctPassword = 'contrasenaCorrecta';
        document.getElementById('username').value = correctUser;
        document.getElementById('password').value = correctPassword;

        // Verificar credenciales automáticamente (si es necesario)
        const autoLoginUser = users.find(u => u.username === correctUser && u.password === correctPassword);
        if (!autoLoginUser) {
            alert('Error al autenticar usuario automáticamente. Por favor, inicie sesión manualmente.');
            window.location.href = 'index.html';
        }
    }
}

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Asegurarse de que se hayan ingresado el nombre de usuario y la contraseña
    if (!username || !password) {
        alert('Por favor, ingrese el nombre de usuario y la contraseña.');
        return;
    }

    // Obtener usuarios del localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Verificar credenciales
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        // Almacenar el estado de inicio de sesión en sessionStorage
        sessionStorage.setItem('loggedIn', 'true');
        // Redirigir a inicio.html
        window.location.href = 'inicio.html';
    } else {
        alert('Usuario o contraseña incorrectos');
    }
}



