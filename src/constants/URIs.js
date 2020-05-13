/** @format */

const BASE_URL = "http://localhost:8080/ProyectoTextos";

export const OBRAS_URL = `${BASE_URL}/obras`;
export const OBRAS_SINCORREGIR_URL = (username) =>
  `${BASE_URL}/ObraSinCorregirPorProfesional?nombreUsuarioProfesional=${username}`;
export const OBRAS_CONTENIDO_URL = (nameWork, author) =>
  `${BASE_URL}/ContenidoObras?nombreObra=${nameWork}&userAutor=${author}`;
