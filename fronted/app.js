// Importaciones
import { armarCiudades, armarGenero, armarUsuario } from "./components/index.js";
import { validar } from "./helpers/validarFormulario.js";
import { ciudades, generos, usuarios } from "./use-case/index.js";
import { createUser } from "./use-case/usuarios/createUser.js";

// variables
const formulario = document.querySelector('form');
const documento = document.querySelector("#documento");
const nombre = document.querySelector("#nombre");
const correo = document.querySelector("#correo");
const divGeneros = document.getElementById("generos");
const ciudad = document.querySelector("#ciudadId");
const divUsuarios = document.querySelector("#usuarios");

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

// Eventos
document.addEventListener("DOMContentLoaded", async () => {
  let datosCiudades = await ciudades();
  let datosGeneros = await generos();
  let datosUsuarios = await usuarios();
  armarGenero(divGeneros, datosGeneros);
  armarCiudades(ciudad, datosCiudades);
  armarUsuario(divUsuarios, datosUsuarios);
})

// Agregamos 'async' al evento para poder usar 'await'
formulario.addEventListener("submit", async (e) => {
  e.preventDefault();
  
  const { esValido, documento, nombre, genero, ciudad, correo } = validarFormulario(e.target);
  
  if (!esValido) return;

  await createUser(documento, nombre, genero, ciudad, correo);

  formulario.reset();

  let datosUsuarios = await usuarios();
  armarUsuario(divUsuarios, datosUsuarios);

});