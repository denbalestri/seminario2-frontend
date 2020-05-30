const SERVER_URL = 'http://localhost:8080/ProyectoTextos';

const INICIO_URL = '/';
const PERFIL_URL = '/perfil';
const GRUPOS_URL = '/grupos';
const REVISIONES_URL = '/revisiones';
const NOTFOUND_URL = '*';
const PROFESIONALES_URL = '/profesionales';
const TRABAJOS_URL = '/trabajos';
const DEVOLUCIONES_URL = '/devoluciones';
const INFORMACIONPROFESIONAL_URL = '/informacion-profesional';
const LOGIN_URL = '/iniciar-sesion';
const REGISTER_URL = '/registracion';
const MENUPRINCIPAL_URL = '/menu';

export const CLIENTE = {
  INICIO_URL,
  PERFIL_URL,
  GRUPOS_URL,
  REVISIONES_URL,
  PROFESIONALES_URL,
  TRABAJOS_URL,
  DEVOLUCIONES_URL,
  INFORMACIONPROFESIONAL_URL,
  NOTFOUND_URL,
  LOGIN_URL,
  REGISTER_URL,
  MENUPRINCIPAL_URL,
};

export const SERVIDOR = {
  OBRAS_URL: `${SERVER_URL}/obras`,
  CORRECCIONES_URL: `${SERVER_URL}/correcciones`,
  OBRAS_SINCORREGIR_URL: username =>
    `${SERVER_URL}/ObraSinCorregirPorProfesional?nombreUsuarioProfesional=${username}`,
  OBRAS_CONTENIDO_URL: (nameWork, author) =>
    `${SERVER_URL}/ContenidoObras?nombreObra=${nameWork}&userAutor=${author}`,
  SEARCHPROFESSIONAL_URL: professional =>
    `${SERVER_URL}/usuarios?nombreUsuario=${professional}`,
};
