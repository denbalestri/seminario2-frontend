import React, { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import useInterval from '../../Hooks/useInterval';
import { CLIENTE } from '../../constants/URIs';
import MenuNotification from '../MenuNotification';
import Appbar from '../Appbar';
import useStyles from './styles';

const MainLayout = ({ children }) => {
  const classes = useStyles();
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
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    setOpenNotificacion(false);
  };

  useInterval(() => {
    //call server to get all new reviews, the interval 'll call every five seconds
    //dispatch a action to updated the store and when the user open the notifications,
    // set notificationsRead (notifications recived - notifications read)
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
    // go to review page with all the reviews
    history.push('/revisiones');
  };

  const onClickGroup = () => {
    history.push('/grupos');
  };

  const handleClickLogout = () => {
    // call a dispatcher and remove the data from de user
  };

  const onClickProfessional = () => {
    history.push('/profesionales');
  };

  return (
    <main
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'stretch',
        flexDirection: 'column',
      }}
    >
      <Appbar
        onClickGroup={onClickGroup}
        onClickReview={onClickReview}
        handleClickLogout={handleClickLogout}
        notificationsBadge={notificationsBadge}
        onClickNotifications={onClickNotifications}
        onClickProfessional={onClickProfessional}
      />
      <MenuNotification
        anchorEl={anchorEl}
        handleMenuClose={handleMenuClose}
        open={openNotificacion}
      />
      <div
        className="mainContent"
        style={{ height: '100%', width: '100%', overflow: 'scroll' }}
      >
        {children}
      </div>
    </main>
  );
};

export default MainLayout;
