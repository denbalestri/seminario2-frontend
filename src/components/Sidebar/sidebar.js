/** @format */

import React from "react";
import { slide as Menu } from "react-burger-menu";
import { Avatar } from "antd";
import { useSelector } from "react-redux";
import {
  UserOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";

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

const sidebar = [
  {
    name: "Inicio",
    icon: faHouseUser,
    href: "/",
  },
  {
    name: "Mi Perfil",
    icon: faAddressBook,
    href: "/",
  },
  {
    name: "Mis Grupos",
    icon: faUsers,
    href: "/",
  },
  {
    name: "Profesionales",
    icon: faGraduationCap,
    href: "/professionals",
  },
  {
    name: "Revisiones",
    icon: faUserEdit,
    href: "/",
  },
  {
    name: "Cerrar Sesión",
    icon: faSignOutAlt,
    href: "/",
  },
];

const Sidebar = ({ className, ...othersProps }) => {
  const user = useSelector((state) => state.user);
  return (
    <Menu
      className={"sidebar"}
      customBurgerIcon={<MenuUnfoldOutlined />}
      customCrossIcon={<MenuFoldOutlined />}
    >
      <Avatar size={150} src={""} icon={<UserOutlined />} />

      <a className="nombre">
        {user.firstName} {user.lastName}
        <br />
        <p className="nombreUsuario">@{user.username}</p>
      </a>

      {sidebar.map((menuItem, index) => {
        return (
          <a className="menu-item" key={index} href={menuItem.href}>
            <FontAwesomeIcon icon={menuItem.icon} /> {menuItem.name}
          </a>
        );
      })}
    </Menu>
  );
};

export default Sidebar;
