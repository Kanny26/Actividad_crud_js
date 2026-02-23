
export const armarUsuario = (elemento, datos) => {
    const fragmento = document.createDocumentFragment();

    datos.forEach(usuario => {
        const card = document.createElement('div');
        card.classList.add('card');

        const btnEliminar = document.createElement('button');
        btnEliminar.textContent = 'Eliminar';

        const crearFila = (label, valor) => {
            const divFila = document.createElement('div');
            const pLabel = document.createElement('p');
            pLabel.textContent = label;
            const pValor = document.createElement('p');
            pValor.textContent = valor;
            divFila.append(pLabel, pValor);
            return divFila;
        };

        const filaDoc = crearFila('Documento:', usuario.documento);
        const filaNom = crearFila('Nombre:', usuario.nombre);
        const filaGen = crearFila('Genero:', usuario.genero || usuario.genero_id);
        const filaCiu = crearFila('Ciudad:', usuario.ciudad || usuario.ciudad_id);
        const filaCor = crearFila('Correo:', usuario.correo);

        const btnEditar = document.createElement('button');
        btnEditar.textContent = 'Editar';

        card.append(btnEliminar, filaDoc, filaNom, filaGen, filaCiu, filaCor, btnEditar);
        
        fragmento.append(card);
    });

    elemento.append(fragmento);
}