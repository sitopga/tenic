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
          
        };
    });
}

// Asignar la fecha actual al valor del campo de entrada
var fechaActual = new Date();
var formattedFecha = fechaActual.toISOString().split('T')[0];
document.getElementById('diaInput').value = formattedFecha;

async function guardarDatos() {
    var horas = parseInt(document.getElementById("horasInput").value) || 0;
    var minutos = parseInt(document.getElementById("minutosInput").value) || 0;
    var fecha = document.getElementById("diaInput").value;

    // Verificar si las horas y minutos son diferentes de cero antes de guardar
    if (horas === 0 && minutos === 0) {
        alert('Por favor, ingresa valores válidos para las horas y los minutos.');
        return;
    }

    var db = await abrirIndexedDB();

    var transaction = db.transaction(['datos'], 'readwrite');
    var objectStore = transaction.objectStore('datos');

    var request = objectStore.add({ horas: horas, minutos: minutos, fecha: fecha });

    request.onsuccess = function(event) {
        mostrarDatosGuardados();
        
        // Limpiar los campos después de guardar
        document.getElementById("horasInput").value = "";
        document.getElementById("minutosInput").value = "";
        document.getElementById("diaInput").value = formattedFecha;
    };

    request.onerror = function(event) {
        console.error('Error al guardar los datos.');
    };

    ocultarModal('enfriador');
}

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

            // Ajustar las horas si los minutos superan 59
            if (totalMinutos > 59) {
                totalHoras += Math.floor(totalMinutos / 60); // Sumar las horas adicionales
                totalMinutos = totalMinutos % 60; // Ajustar los minutos
            }

            cursor.continue();
        } else {
            // Ajustar las horas finales si los minutos superan 59
            if (totalMinutos > 59) {
                totalHoras += Math.floor(totalMinutos / 60); // Sumar las horas adicionales
                totalMinutos = totalMinutos % 60; // Ajustar los minutos
            }

            var datosGuardadosDiv = document.getElementById("datosGuardados");
            datosGuardadosDiv.innerHTML = totalHoras + " H " + totalMinutos + " M";
        }
    };
}

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

