import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { logoutUser } from '../../redux/actions/user';
import { addNotifications } from '../../redux/actions/notifications';
import useInterval from '../../Hooks/useInterval';
import { CLIENTE, SERVIDOR } from '../../constants/URIs';
import MenuNotification from '../MenuNotification';
import AppbarAuthor from '../AppbarAuthor';
import AppbarProfessional from '../AppbarProfessional';
import useStyles from './styles';

const MainLayout = ({ children }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [placeholder, setPlaceholder] = useState('');
  const [searchHide, setSearchHide] = useState(false);
  const history = useHistory();
  const location = history.location.pathname;
  const [openNotificacion, setOpenNotificacion] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationsBadge, setNotificationsBadge] = useState(1);
  const user = useSelector(state => state.user);

  const onClickNotifications = event => {
    setAnchorEl(event.currentTarget);
    setOpenNotificacion(true);
    setNotificationsBadge(0);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    setOpenNotificacion(false);
  };

  useInterval(() => {
    fetch(`${SERVIDOR.NOTIFICACIONES_URL}/?username=${user.username}`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
      .then(response => {
        return response.json();
      })
      .then(response => {
        dispatch(addNotifications(response));
      })
      .catch(error => console.log(error));
  }, 5000);

  useEffect(() => {
    if (location === CLIENTE.PROFESIONALES_URL) {
      setSearchHide(false);
      setPlaceholder('B\u00FAsqueda por profesional o g\u00E9nero');
    } else {
      setSearchHide(true);
    }
  }, [location]);

  const onClickReview = () => {
    history.push('/revisiones');
  };

  const onClickGroup = () => {
    history.push('/grupos');
  };

  const handleClickLogout = () => {
    dispatch(logoutUser());
    history.push('/iniciar-sesion');
  };

  const onClickProfessional = () => {
    history.push('/profesionales');
  };

  const onClickWork = () => {
    history.push('/trabajos');
  };

  return (
    <main className={classes.root}>
      <section className={classes.section}>
        {user.rol === 'Autor' ? (
          <AppbarAuthor
            onClickGroup={onClickGroup}
            onClickReview={onClickReview}
            handleClickLogout={handleClickLogout}
            notificationsBadge={notificationsBadge}
            onClickNotifications={onClickNotifications}
            onClickProfessional={onClickProfessional}
          />
        ) : (
          <AppbarProfessional
            onClickGroup={onClickGroup}
            handleClickLogout={handleClickLogout}
            notificationsBadge={notificationsBadge}
            onClickNotifications={onClickNotifications}
            onClickWork={onClickWork}
          />
        )}
        <MenuNotification
          anchorEl={anchorEl}
          handleMenuClose={handleMenuClose}
          open={openNotificacion}
        />
        <div className={classes.content}>{children}</div>
      </section>
    </main>
  );
};

export default MainLayout;
