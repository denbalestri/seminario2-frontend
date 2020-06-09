import React, { useEffect } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';
import Popover from '@material-ui/core/Popover';
import useStyles from './styles';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { SERVIDOR } from '../../constants/URIs';
import { readNotifications } from '../../redux/actions/notifications';

const getNotificationMessage = notification => (
  <span>
    Recibiste la devolución de{' '}
    <span
      style={{
        fontStyle: 'italic',
        fontWeight: 'bold',
        color: '#2a88db',
      }}
    >
      {`${notification.nombreProfesional} ${notification.apellidoProfesional}`}
    </span>{' '}
    de tu obra{' '}
    <span style={{ fontWeight: 'bold', color: '#e80053' }}>
      {notification.nombreObra}
    </span>
  </span>
);

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
      {notifications.map((notification, index) => {
        let notificationStyle = { padding: '10px 15px' };

        if (notification.read)
          notificationStyle = { ...notificationStyle, backgroundColor: 'grey' };

        return (
          <MenuItem
            key={index}
            style={notificationStyle}
            onClick={() =>
              history.push(getNotificationDestination(notification))
            }
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
        );
      })}
    </>
  );
};

const MenuNotification = ({ open, anchorEl, handleMenuClose }) => {
  const dispatch = useDispatch();
  const username = useSelector(state => state.user.username);
  const notifications = useSelector(state => state.notifications.notifications);

  useEffect(() => {
    dispatch(readNotifications());
    const body = JSON.stringify({
      username,
    });

    fetch(SERVIDOR.ACTUALIZAR_NOTIFICACIONES_URL, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body,
    }).catch(error => console.log(error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      <Notifications notifications={notifications} />
    </Popover>
  );
};

export default MenuNotification;
