import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';
import { Avatar } from 'antd';
import { useSelector } from 'react-redux';
import {
  UserOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  sidebarItemsAuthor,
  sidebarItemsProfessional,
} from '../../constants/sidebarItems';
import './sidebar.css';

const Sidebar = () => {
  const user = useSelector(state => state.user);
  const [sidebarItems, setSidebarItems] = useState([]);

  useEffect(() => {
    if (user.rol === 'Autor') setSidebarItems(sidebarItemsAuthor);
    else setSidebarItems(sidebarItemsProfessional);
  }, []);

  return (
    <Menu
      className={'sidebar'}
      customBurgerIcon={<MenuUnfoldOutlined />}
      customCrossIcon={<MenuFoldOutlined />}
    >
      <Avatar
        size={150}
        src={user.avatar}
        icon={<UserOutlined />}
        style={{ outline: 'none' }}
      />
      <section className="usuario">
        <p className="nombre">{`${user.firstName} ${user.lastName}`}</p>
      </section>
      {sidebarItems.map((menuItem, index) => {
        return (
          <Link className="menu-item" key={index} to={menuItem.href}>
            <FontAwesomeIcon icon={menuItem.icon} /> {menuItem.name}
          </Link>
        );
      })}
    </Menu>
  );
};

export default Sidebar;
