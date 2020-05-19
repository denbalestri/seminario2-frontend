const SERVER_URL = 'http://localhost:8080/ProyectoTextos';

const INICIO_URL = '/';
const PERFIL_URL = '/perfil';
const GRUPOS_URL = '/grupos';
const REVISIONES_URL = '/revisiones';
const PROFESIONALES_URL = '/profesionales';
const TRABAJOS_URL = '/trabajos';
const DEVOLUCIONES_URL = '/devoluciones';

export const CLIENTE = {
  INICIO_URL,
  PERFIL_URL,
  GRUPOS_URL,
  REVISIONES_URL,
  PROFESIONALES_URL,
  TRABAJOS_URL,
  DEVOLUCIONES_URL,
};

export const SERVIDOR = {
  OBRAS_URL: `${SERVER_URL}/obras`,
  SEARCHPROFESSIONAL_URL: professional =>
    `${SERVER_URL}/usuarios?nombreUsuario=${professional}`,
};
