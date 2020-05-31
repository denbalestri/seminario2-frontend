import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';
import Popover from '@material-ui/core/Popover';
import useStyles from './styles';
import { useHistory } from 'react-router-dom';

const NOTIFICATIONS = [
  {
    type: 'DEVOLUCION',
    author: 'Santiago Rico',
    title: 'La chica en la oscuridad',
  },
];

const getNotificationMessage = notification => {
  switch (notification.type) {
    case 'DEVOLUCION':
      return (
        <span>
          Recibiste la devolución de{' '}
          <span
            style={{
              fontStyle: 'italic',
              fontWeight: 'bold',
              color: '#2a88db',
            }}
          >
            {notification.author}
          </span>{' '}
          de tu obra{' '}
          <span style={{ fontWeight: 'bold', color: '#e80053' }}>
            {notification.title}
          </span>
        </span>
      );
    default:
      return 'Notificacion de tipo no reconocido';
  }
};

const getNotificationDestination = ({ type }) => {
  switch (type) {
    case 'DEVOLUCION':
      return '/revisiones';
    default:
      return '/';
  }
};

const Notifications = ({ notifications }) => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <>
      {notifications.map((notification, index) => (
        <MenuItem
          key={index}
          style={{ padding: '10px 15px' }}
          onClick={() => history.push(getNotificationDestination(notification))}
        >
          <Avatar
            alt="Profesional"
            src="../../../images/person3.jpg"
            className={classes.large}
            style={{
              marginRight: 16,
            }}
          />
          {getNotificationMessage(notification)}
        </MenuItem>
      ))}
    </>
  );
};

const MenuNotification = ({ open, anchorEl, handleMenuClose }) => {
  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={handleMenuClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
    >
      <Notifications notifications={NOTIFICATIONS} />
    </Popover>
  );
};

export default MenuNotification;
