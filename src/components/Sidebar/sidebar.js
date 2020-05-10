import React from "react";
import { slide as Menu } from "react-burger-menu";
import { Avatar } from "antd";
import {
  UserOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined
} from "@ant-design/icons";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouseUser,
  faAddressBook,
  faUsers,
  faGraduationCap,
  faUserEdit,
  faSignOutAlt
} from "@fortawesome/free-solid-svg-icons";
import "./sidebar.css";
import store from "../../redux/store";

const sidebar = [
  {
    nombre: "Inicio",
    icon: faHouseUser
  },
  {
    nombre: "Mi Perfil",
    icon: faAddressBook
  },
  {
    nombre: "Mis Grupos",
    icon: faUsers
  },
  {
    nombre: "Profesionales",
    icon: faGraduationCap
  },
  {
    nombre: "Revisiones",
    icon: faUserEdit
  },
  {
    nombre: "Cerrar Sesión",
    icon: faSignOutAlt
  }
];

const Sidebar = ({
  customBurgerIcon,
  customCrossIcon,
  className,
  ...props
}) => {
  return (
    <Menu
      className={"sidebar"}
      customBurgerIcon={<MenuUnfoldOutlined />}
      customCrossIcon={<MenuFoldOutlined />}
    >
      <Avatar size={150} src={""} icon={<UserOutlined />} />

      <a className="nombre">
        {store.getState().user.firstName} {store.getState().user.lastName}
        <br />
        <a className="nombreUsuario">@{store.getState().user.username}</a>
      </a>

      {sidebar.map(menuItem => {
        return (
          <a className="menu-item">
            <FontAwesomeIcon icon={menuItem.icon} /> {menuItem.nombre}
          </a>
        );
      })}
    </Menu>
  );
};

Sidebar.propTypes = {
  customBurgerIcon: PropTypes.string,
  customCrossIcon: PropTypes.string,
  className: PropTypes.string
};

export default Sidebar;
