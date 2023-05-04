// Variables
const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');

// Container for results
const resultado = document.querySelector('#resultado');

const max = new Date().getFullYear();
const min = max - 10;

// Generate an object with the search
const datosBusqueda = {
    marca: '',
    year: '',
    minimo: '',
    maximo: '',
    puertas: '',
    transmision: '',
    color: ''

}

// Events
document.addEventListener('DOMContentLoaded', () => {
    mostrarAutos(autos); // Show cars when loading 

    // Fill in the years options
    llenarSelect();
});

// Events listene for the search select
marca.addEventListener('change', e => {
    datosBusqueda.marca = e.target.value;
    filtrarAuto();
});

year.addEventListener('change', e => {
    datosBusqueda.year = parseInt(e.target.value) ;
    filtrarAuto();
});

minimo.addEventListener('change', e => {
    datosBusqueda.minimo = e.target.value;
    filtrarAuto();
});

maximo.addEventListener('change', e => {
    datosBusqueda.maximo = e.target.value;
    filtrarAuto();
});

puertas.addEventListener('change', e => {
    datosBusqueda.puertas = parseInt(e.target.value);
    filtrarAuto();
});

transmision.addEventListener('change', e => {
    datosBusqueda.transmision = e.target.value;
    filtrarAuto();
});

color.addEventListener('change', e => {
    datosBusqueda.color = e.target.value;
    filtrarAuto();
});

// Funtions 
function mostrarAutos(autos) {  

    // Remove old HTML
    limpiarHTML();

    autos.forEach( auto => {
        const autoHTML = document.createElement('P');

        autoHTML.textContent = `
        ${auto.marca} ${auto.modelo} - ${auto.year} - ${auto.puertas} puertas - Transmisión ${auto.transmision} - Precio: ${auto.precio} - Color: ${auto.color}
        `;

        // Insert in the HTML
        resultado.appendChild(autoHTML);
    })
}

// Clear HTML
function limpiarHTML () {
    while (resultado .firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}

function llenarSelect() {
    for ( let i = max; i >= min; i-- ) {
        const opcion = document.createElement('option');
        opcion.value = i;
        opcion.textContent = i;

        year.appendChild(opcion); // Add year option to the select 
    }
}

function filtrarAuto() {
    const resultado = autos.filter(filtrarMarca).filter(filtrarYear).filter(filtrarMinimo).filter(filtrarMaximo).filter(filtrarPuertas).filter(filtrarTransmision).filter(filtrarColor);

    if(resultado.length) {
        mostrarAutos(resultado);
    } else {
        noResultado();
    }
}

function noResultado() {

    limpiarHTML();

    const noResultado = document.createElement('div');
    noResultado.classList.add('alerta', 'error');
    noResultado.textContent = 'No hay resultados. Intenta con otros términos de busqueda';
    resultado.appendChild(noResultado);
}

function filtrarMarca(auto) {
    if (datosBusqueda.marca) {
        return auto.marca  === datosBusqueda.marca;
    } else {
        return auto;
    }
}

function filtrarYear(auto) {
    if (datosBusqueda.year) {
        return auto.year  === datosBusqueda.year;
    } else {
        return auto;
    }
}

function filtrarMinimo (auto) {
    if (datosBusqueda.minimo) {
        return auto.precio  >= datosBusqueda.minimo;
    } else {
        return auto;
    }
}

function filtrarMaximo (auto) {
    if (datosBusqueda.maximo) {
        return auto.precio  <= datosBusqueda.maximo;
    } else {
        return auto;
    }
}

function filtrarPuertas(auto) {
    if (datosBusqueda.puertas) {
        return auto.puertas  === datosBusqueda.puertas;
    } else {
        return auto;
    }
}

function filtrarTransmision (auto) {
    if (datosBusqueda.transmision) {
        return auto.transmision  === datosBusqueda.transmision;
    } else {
        return auto;
    }
}

function filtrarColor(auto) {
    if (datosBusqueda.color) {
        return auto.color  === datosBusqueda.color;
    } else {
        return auto;
    }
}