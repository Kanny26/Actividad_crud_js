// Importaciones
import { armarCiudades, armarGenero, armarUsuario } from "./components/index.js";
import { validar } from "./helpers/validarFormulario.js";
import { ciudades, generos, usuarios } from "./use-case/index.js";
import { createUser } from "./use-case/usuarios/createUser.js";
import { updateUsuario } from "./use-case/usuarios/updateUsuario.js";
import { deleteUsuario } from "./use-case/usuarios/deleteUsuario.js";

// variables
const formulario = document.querySelector('form');
const documento = document.querySelector("#documento");
const nombre = document.querySelector("#nombre");
const correo = document.querySelector("#correo");
const divGeneros = document.getElementById("generos");
const ciudad = document.querySelector("#ciudadId");
const divUsuarios = document.querySelector("#usuario");

const reglas =
{
    documento: { required: true, min: 8, max: 10, mensaje: "El campo es obligatorio" },
    nombre: { required: true, mensaje: "El campo es obligatorio" },
    genero: { required: true, mensaje: "Por favor seleccione su genero" },
    ciudad: { required: true, mensaje: "Por favor seleccione su ciudad" },
    correo: { required: true, mensaje: "El campo es obligatorio" }
};

// Métodos

/**
 * Función para validar los campos del formulario formulario
 * 
 * @param {HTMLFormElement} form - Formulario a validar
 * @returns  {Object} - {esValido: boolean, documento: string, nombre: string, genero: string, ciuda: string, correo: string }
 */
const validarFormulario = (e) => {
    let respuesta = validar(e, reglas);
    documento.classList.remove('error')
    nombre.classList.remove('error')
    ciudad.classList.remove('error');
    divGeneros.classList.remove('error')
    correo.classList.remove('error')
    if (!respuesta.valido) {
        if (respuesta.errores.documento) {
            documento.classList.add('error')
        }
        if (respuesta.errores.nombre) {
            nombre.classList.add('error')
        }
        if (respuesta.errores.ciudad) {
            ciudad.classList.add('error')
        }
        if (respuesta.errores.genero) {
            divGeneros.classList.add('error')
        }
        if (respuesta.errores.correo) {
            correo.classList.add('error')
        }
    }
    if (!respuesta.valido) {
        return {
            esValido: respuesta.valido
        }
    } else {
        return {
            esValido: respuesta.valido,
            documento: documento.value,
            nombre: nombre.value,
            genero: e.querySelector('input[name="genero"]:checked').value,
            ciudad: ciudad.value,
            correo: correo.value
        }
    }
}

// Función auxiliar para cargar usuario en formulario (modo edición)
const cargarDatosEnFormulario = function(usuario) {
    documento.value = usuario.documento;
    nombre.value = usuario.nombre;
    correo.value = usuario.correo;
    
    const radioGenero = document.querySelector('input[name="genero"][value="' + usuario.genero_id + '"]');
    if (radioGenero) {
        radioGenero.checked = true;
    }
    
    ciudad.value = usuario.ciudad_id;
    
    // Guardamos el ID en un atributo data del formulario para saber que estamos editando
    formulario.setAttribute('data-editing-id', usuario.id);
};

// Función auxiliar para limpiar formulario
const limpiarFormulario = function() {
    formulario.reset();
    formulario.removeAttribute('data-editing-id');
};

// Eventos
document.addEventListener("DOMContentLoaded", async () => {
    let datosCiudades = await ciudades();
    let datosGeneros = await generos();
    let datosUsuarios = await usuarios();
    armarGenero(divGeneros, datosGeneros);
    armarCiudades(ciudad, datosCiudades);
    armarUsuario(divUsuarios, datosUsuarios);
});

// Delegación de eventos para botones de las cards (Editar/Eliminar)
divUsuarios.addEventListener('click', async function(evento) {
    const elemento = evento.target;
    const card = elemento.closest('.card');
    
    if (!card) {
        return;
    }
    
    const usuarioId = card.getAttribute('data-id');
    
    // Obtener valores desde el DOM de la card
    const filas = card.querySelectorAll('.card-row');
    const datosCard = {
        documento: filas[0].querySelector('.card-value').textContent,
        nombre: filas[1].querySelector('.card-value').textContent,
        genero_id: filas[2].querySelector('.card-value').textContent,
        ciudad_id: filas[3].querySelector('.card-value').textContent,
        correo: filas[4].querySelector('.card-value').textContent
    };

    // Acción Eliminar
    if (elemento.classList.contains('btn-eliminar')) {
        const confirmar = confirm('¿Desea eliminar este usuario?');
        if (confirmar) {
            try {
                await deleteUsuario(usuarioId);
                const datosActualizados = await usuarios();
                armarUsuario(divUsuarios, datosActualizados);
            } catch (error) {
                console.error('Error eliminando:', error);
                alert('No se pudo eliminar el usuario');
            }
        }
    }

    // Acción Editar
    if (elemento.classList.contains('btn-editar')) {
        cargarDatosEnFormulario({ id: usuarioId, ...datosCard });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});

// Submit del formulario (CREATE o UPDATE)
formulario.addEventListener("submit", async (e) => {
    e.preventDefault();

    const { esValido, documento: docVal, nombre: nomVal, genero: genVal, ciudad: ciuVal, correo: corVal } = validarFormulario(e.target);

    if (!esValido) return;

    const idEdicion = formulario.getAttribute('data-editing-id');

    try {
        if (idEdicion) {
            // Modo UPDATE (PUT)
            await updateUsuario(idEdicion, docVal, nomVal, genVal, ciuVal, corVal);
            alert('Usuario actualizado');
        } else {
            // Modo CREATE (POST)
            await createUser(docVal, nomVal, genVal, ciuVal, corVal);
            alert('Usuario creado');
        }

        limpiarFormulario();

        const datosActualizados = await usuarios();
        armarUsuario(divUsuarios, datosActualizados);

    } catch (error) {
        console.error('Error guardando:', error);
        alert('Error al guardar los datos');
    }
});