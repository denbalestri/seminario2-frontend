/** @format */

import React, { useEffect, useState } from "react";
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
  sidebarItemsAuthor,
  sidebarItemsProfessional,
} from "../../constants/sidebarItems";
import "./sidebar.css";

const Sidebar = ({ className, ...othersProps }) => {
  const user = useSelector((state) => state.user);
  const [sidebarItems, setSidebarItems] = useState([]);

  useEffect(() => {
    if (user.rol === "Autor") setSidebarItems(sidebarItemsAuthor);
    else setSidebarItems(sidebarItemsProfessional);
  }, []);

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

      {sidebarItems.map((menuItem, index) => {
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
