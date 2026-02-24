export const updateUsuario = async (id, documento, nombre, genero, ciudad, correo) => {
    const solicitud = await fetch('http://localhost:3001/usuarios/' + id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            documento: documento,
            nombre: nombre,
            genero_id: genero,
            ciudad_id: ciudad,
            correo: correo
        })
    });
    
    const respuesta = await solicitud.json();
    return respuesta;
};