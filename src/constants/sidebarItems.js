import {
  faHouseUser,
  faAddressBook,
  faUsers,
  faGraduationCap,
  faUserEdit,
  faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';
import { CLIENTE } from './URIs';

function generarItem(name, icon, href) {
  return { name, icon, href };
}

const inicio = generarItem('Inicio', faHouseUser, CLIENTE.INICIO_URL);
const perfil = generarItem('Mi Perfil', faAddressBook, CLIENTE.PERFIL_URL);
const grupos = generarItem('Mis Grupos', faUsers, CLIENTE.GRUPOS_URL);
const profesionales = generarItem('Profesionales', faGraduationCap, CLIENTE.PROFESIONALES_URL);
const revisiones = generarItem('Revisiones', faUserEdit, CLIENTE.REVISIONES_URL);
const salir = generarItem('Cerrar Sesión', faSignOutAlt, CLIENTE.INICIO_URL);

const trabajos = generarItem('Trabajos', faGraduationCap, CLIENTE.TRABAJOS_URL);
const devoluciones = generarItem('Devoluciones', faUserEdit, CLIENTE.DEVOLUCIONES_URL);

export const sidebarItemsAuthor = [inicio, perfil, grupos, profesionales, revisiones, salir];
export const sidebarItemsProfessional = [inicio, perfil, grupos, trabajos, devoluciones, salir];
