
function consultarClima() {
    const ciudad = document.getElementById('txtCiudad').value;
    const API_KEY = '7988e38cdeafad1d912e3c3ab218ad65';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${API_KEY}`;

    fetch(url, {
        method: 'GET'
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Error en la respuesta de la API');
            }
        })
        .then(data => {
            // Mostrar resultado en la tabla
            const tabla = document.getElementById('tabla-clima').getElementsByTagName('tbody')[0];
            const fila = tabla.insertRow();
            fila.setAttribute('id', data.id); //Con esto agrego el id del clima que me trae en el objeto data
            fila.insertCell().innerHTML = data.name;
            fila.insertCell().innerHTML = `${(data.main.temp - 273.15).toFixed(1)}°C`;
            fila.insertCell().innerHTML = data.weather[0].description;
            fila.insertCell().innerHTML = `<button id="btnEliminar">Eliminar</button>`;

            const botonEliminar = fila.querySelector("#btnEliminar");
            botonEliminar.addEventListener("click", function () {
                const id = fila.getAttribute('id'); //  obtengo el id de la fila
                tabla.deleteRow(fila.rowIndex-1); //elimino la fila de la tabla
            });

        })
        .catch(error => {
            console.error('Error al consultar el clima', error);
        });
}

function consultarClimas () {
    const ciudades = document.getElementById('txtCiudades').value.split(',').map(ciudad => ciudad.trim());
    const API_KEY = '7988e38cdeafad1d912e3c3ab218ad65'; // Sustituye "tu_api_key" por tu propia API key de OpenWeatherMap

    Promise.all(ciudades.map(ciudad => {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${API_KEY}`;
        return fetch(url).then(response => {
            if (response.ok) {
                return response.json();
            }
            else {
                throw new Error('Error en la respuesta de la API');
            }
        });
    }))
        .then(data => {
            //Mostrar resultados en la tabla
            const tabla = document.getElementById('tabla-clima').getElementsByTagName('tbody')[0];
            data.forEach(ciudad => {
                const fila = tabla.insertRow();
                fila.insertCell().innerHTML = ciudad.name;
                fila.insertCell().innerHTML = `${(ciudad.main.temp - 273.15).toFixed(1)}°C`;
                fila.insertCell().innerHTML = ciudad.weather[0].description;
                fila.insertCell().innerHTML = `<button id="btnEliminar">Eliminar</button>`;
                const botonEliminar = fila.querySelector("#btnEliminar");
                botonEliminar.addEventListener("click", function () {
                const id = fila.getAttribute('id'); //  obtengo el id de la fila
                tabla.deleteRow(fila.rowIndex-1); //elimino la fila de la tabla
            });

            });
        })
        .catch(error => {
            console.error('Error al consultar el clima', error);
        });
}
    // limpiar resultados de la tabla
function limpiarTabla() {

    const tabla = document.getElementById('tabla-clima').getElementsByTagName('tbody');
    for (let i = 0; i < tabla.length; i++) {
        tabla[i].innerHTML = "";
    }
}

