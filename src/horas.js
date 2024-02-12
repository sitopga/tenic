// Función para abrir la base de datos IndexedDB
function abrirIndexedDB() {
    return new Promise((resolve, reject) => {
        var request = window.indexedDB.open('usuarios', 1);

        request.onerror = function(event) {
            reject('Error al abrir la base de datos.');
        };

        request.onsuccess = function(event) {
            resolve(event.target.result);
        };

        request.onupgradeneeded = function(event) {
            var db = event.target.result;
            var objectStore = db.createObjectStore('datos', { keyPath: 'id', autoIncrement: true });
            objectStore.createIndex('horas', 'horas', { unique: false });
            objectStore.createIndex('minutos', 'minutos', { unique: false });
        };
    });
}

// Función para guardar datos en IndexedDB
async function guardarDatos() {
    var horas = parseInt(document.getElementById("horasInput").value) || 0;
    var minutos = parseInt(document.getElementById("minutosInput").value) || 0;

    var db = await abrirIndexedDB();

    var transaction = db.transaction(['datos'], 'readwrite');
    var objectStore = transaction.objectStore('datos');

    var request = objectStore.add({ horas: horas, minutos: minutos });

    request.onsuccess = function(event) {
        mostrarDatosGuardados();
    };

    request.onerror = function(event) {
        console.error('Error al guardar los datos.');
    };
  

    ocultarModal('enfriador');
}

// Función para mostrar datos guardados desde IndexedDB
async function mostrarDatosGuardados() {
    var db = await abrirIndexedDB();

    var transaction = db.transaction(['datos'], 'readonly');
    var objectStore = transaction.objectStore('datos');

    var totalHoras = 0;
    var totalMinutos = 0;

    objectStore.openCursor().onsuccess = function(event) {
        var cursor = event.target.result;
        if (cursor) {
            totalHoras += cursor.value.horas;
            totalMinutos += cursor.value.minutos;
            cursor.continue();
        } else {
            var datosGuardadosDiv = document.getElementById("datosGuardados");
            datosGuardadosDiv.innerHTML = totalHoras + " H " + totalMinutos + " M";
        }
    };
}

// Función para borrar todos los datos de IndexedDB
async function borrarDatos() {
    var db = await abrirIndexedDB();

    var transaction = db.transaction(['datos'], 'readwrite');
    var objectStore = transaction.objectStore('datos');
    var clearRequest = objectStore.clear();

    clearRequest.onsuccess = function(event) {
        var datosGuardadosDiv = document.getElementById("datosGuardados");
        datosGuardadosDiv.innerHTML = "";
    };

    clearRequest.onerror = function(event) {
        console.error('Error al borrar los datos.');
    };
}

// Funciones para mostrar y ocultar el modal
function mostrarModal(idModal) {
    var modal = document.getElementById(idModal);
    modal.style.display = 'flex';
}

function ocultarModal(idModal) {
    var modal = document.getElementById(idModal);
    modal.style.display = 'none';
}

window.onload = function() {
    mostrarDatosGuardados();
};

