export const usuarios = async () => {
    const solicitud = await fetch('http://localhost:3001/usuarios');
    const datos = await solicitud.json();
    return datos;
}