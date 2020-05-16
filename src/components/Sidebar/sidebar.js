import React from "react";
import { slide as Menu } from "react-burger-menu";
import { Avatar } from "antd";
import {
  UserOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouseUser,
  faAddressBook,
  faUsers,
  faGraduationCap,
  faUserEdit,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import "./sidebar.css";
import { Link } from "react-router-dom";
import store from "../../redux/store";
import { CLIENTE } from "../../constants/URIs";

const sidebar = [
  {
    nombre: "Inicio",
    icon: faHouseUser,
    uri: CLIENTE.INICIO_URL,
  },
  {
    nombre: "Mi Perfil",
    icon: faAddressBook,
    uri: CLIENTE.PERFIL_URL,
  },
  {
    nombre: "Mis Grupos",
    icon: faUsers,
    uri: CLIENTE.GRUPOS_URL,
  },
  {
    nombre: "Profesionales",
    icon: faGraduationCap,
    uri: CLIENTE.PROFESIONALES_URL,
  },
  {
    nombre: "Revisiones",
    icon: faUserEdit,
    uri: CLIENTE.REVISIONES_URL,
  },
  {
    nombre: "Cerrar Sesión",
    icon: faSignOutAlt,
    uri: "/",
  },
];

const Sidebar = ({ customBurgerIcon, customCrossIcon, className }) => {
  return (
    <Menu
      className={"sidebar"}
      customBurgerIcon={<MenuUnfoldOutlined />}
      customCrossIcon={<MenuFoldOutlined />}
    >
      <Avatar size={150} src={""} icon={<UserOutlined />} />

      <section className="usuario">
        <span className="nombre">
          {store.getState().user.firstName} {store.getState().user.lastName}
        </span>
        <br />
        <span className="nombreUsuario">@{store.getState().user.username}</span>
      </section>

      {sidebar.map((menuItem) => {
        return (
          <Link to={menuItem.uri} className="menu-item">
            <FontAwesomeIcon icon={menuItem.icon} /> {menuItem.nombre}
          </Link>
        );
      })}
    </Menu>
  );
};

Sidebar.propTypes = {
  customBurgerIcon: PropTypes.string,
  customCrossIcon: PropTypes.string,
  className: PropTypes.string,
};

export default Sidebar;
