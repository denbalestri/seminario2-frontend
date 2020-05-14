const BASE_URL = 'http://localhost:8080/ProyectoTextos';

export const OBRAS_URL = `${BASE_URL}/obras`;
export const SEARCHPROFESSIONAL_URL = username =>
  `${BASE_URL}/usuarios?nombreUsuario=${username}`;
