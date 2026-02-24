export const armarUsuario = (elemento, datos) => {
    const fragmento = document.createDocumentFragment();

    datos.forEach(function (usuario) {
        // Crear card principal
        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('data-id', usuario.id);

        // Crear botón Eliminar
        const btnEliminar = document.createElement('button');
        btnEliminar.classList.add('btn-eliminar');
        btnEliminar.setAttribute('type', 'button');

        // Crear icono
        const icono = document.createElement('i');
        icono.classList.add('fas', 'fa-trash');  // FontAwesome
        icono.setAttribute('aria-hidden', 'true');

        // // Crear texto
        // const texto = document.createElement('span');
        // texto.textContent = 'Eliminar';

        // Ensamblar
        btnEliminar.appendChild(icono);
        // btnEliminar.appendChild(texto);

        // Crear contenedor de información
        const infoContainer = document.createElement('div');
        infoContainer.classList.add('card-info');

        // Fila Documento
        const filaDocumento = document.createElement('div');
        filaDocumento.classList.add('card-row');

        const labelDocumento = document.createElement('p');
        labelDocumento.classList.add('card-label');
        labelDocumento.textContent = 'Documento:';

        const valorDocumento = document.createElement('p');
        valorDocumento.classList.add('card-value');
        valorDocumento.textContent = usuario.documento;

        filaDocumento.appendChild(labelDocumento);
        filaDocumento.appendChild(valorDocumento);

        // Fila Nombre
        const filaNombre = document.createElement('div');
        filaNombre.classList.add('card-row');

        const labelNombre = document.createElement('p');
        labelNombre.classList.add('card-label');
        labelNombre.textContent = 'Nombre:';

        const valorNombre = document.createElement('p');
        valorNombre.classList.add('card-value');
        valorNombre.textContent = usuario.nombre;

        filaNombre.appendChild(labelNombre);
        filaNombre.appendChild(valorNombre);

        // Fila Género
        const filaGenero = document.createElement('div');
        filaGenero.classList.add('card-row');

        const labelGenero = document.createElement('p');
        labelGenero.classList.add('card-label');
        labelGenero.textContent = 'Género:';

        const valorGenero = document.createElement('p');
        valorGenero.classList.add('card-value');
        valorGenero.textContent = usuario.genero || usuario.genero_id || '';

        filaGenero.appendChild(labelGenero);
        filaGenero.appendChild(valorGenero);

        // Fila Ciudad
        const filaCiudad = document.createElement('div');
        filaCiudad.classList.add('card-row');

        const labelCiudad = document.createElement('p');
        labelCiudad.classList.add('card-label');
        labelCiudad.textContent = 'Ciudad:';

        const valorCiudad = document.createElement('p');
        valorCiudad.classList.add('card-value');
        valorCiudad.textContent = usuario.ciudad || usuario.ciudad_id || '';

        filaCiudad.appendChild(labelCiudad);
        filaCiudad.appendChild(valorCiudad);

        // Fila Correo
        const filaCorreo = document.createElement('div');
        filaCorreo.classList.add('card-row');

        const labelCorreo = document.createElement('p');
        labelCorreo.classList.add('card-label');
        labelCorreo.textContent = 'Correo:';

        const valorCorreo = document.createElement('p');
        valorCorreo.classList.add('card-value');
        valorCorreo.textContent = usuario.correo;

        filaCorreo.appendChild(labelCorreo);
        filaCorreo.appendChild(valorCorreo);

        // Agregar filas al contenedor de información
        infoContainer.appendChild(filaDocumento);
        infoContainer.appendChild(filaNombre);
        infoContainer.appendChild(filaGenero);
        infoContainer.appendChild(filaCiudad);
        infoContainer.appendChild(filaCorreo);

        // Crear botón Editar
        const btnEditar = document.createElement('button');
        btnEditar.classList.add('btn-editar');
        btnEditar.textContent = 'Editar';
        btnEditar.setAttribute('type', 'button');

        // Ensamblar la card
        card.appendChild(btnEliminar);
        card.appendChild(infoContainer);
        card.appendChild(btnEditar);

        // Agregar card al fragmento
        fragmento.appendChild(card);
    });

    // Limpiar contenedor y agregar nuevo contenido
    elemento.appendChild(fragmento);
};