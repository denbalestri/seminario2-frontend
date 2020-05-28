import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setProfessionals } from '../../redux/actions/professionals';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';

import GroupIcon from '@material-ui/icons/Group';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import RateReviewIcon from '@material-ui/icons/RateReview';
import NotificationsIcon from '@material-ui/icons/Notifications';
import useInterval from '../../Hooks/useInterval';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';
import { debounce } from 'lodash';
import { SERVIDOR, CLIENTE } from '../../constants/URIs';
import Tooltip from '@material-ui/core/Tooltip';
import Popover from '@material-ui/core/Popover';
import useStyles from './styles';

const MainLayout = ({ children }) => {
  const classes = useStyles();
  const [placeholder, setPlaceholder] = useState('');
  const [searchHide, setSearchHide] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const location = history.location.pathname;
  const logoutText = 'Cerrar sesi\u00F3n';
  const [openNotificacion, setOpenNotificacion] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationsBadge, setNotificationsBadge] = useState(0);
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

  const renderMenu = (
    <Popover
      open={openNotificacion}
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
      <Typography className={classes.typography}>Notificaciones</Typography>
      <MenuItem>
        <Avatar
          alt="Profesional"
          src="../../../images/person3.jpg"
          className={classes.large}
        />
        Recibiste la devolucion de Santiago Rico de la obra 'La chica en la
        oscuridad'
      </MenuItem>
    </Popover>
  );

  useEffect(() => {
    if (location === CLIENTE.PROFESIONALES_URL) {
      setSearchHide(false);
      setPlaceholder('B\u00FAsqueda por profesional o g\u00E9nero');
    } else {
      setSearchHide(true);
    }
  }, [location]);

  const onSearch = debounce(professional => {
    if (professional === '') return;
    setLoading(true);
    fetch(SERVIDOR.SEARCHPROFESSIONAL_URL(professional), {
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
        const professionals = response;
        dispatch(setProfessionals(professionals));
      })
      .catch(error => console.log(error))
      .finally(() => setLoading(false));
  }, 500);

  const onChange = e => {
    const professional = e.target.value;
    onSearch(professional);
  };

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
      <AppBar position="static" className={classes.appbar}>
        <Toolbar>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton color="inherit" onClick={onClickGroup}>
              <Tooltip title="Grupos" aria-label="Grupos">
                <GroupIcon />
              </Tooltip>
            </IconButton>
            <IconButton
              aria-label="show 17 new notifications"
              color="inherit"
              onClick={onClickNotifications}
            >
              <Tooltip title="Notificaciones" aria-label="Notificaciones">
                <Badge badgeContent={notificationsBadge} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </Tooltip>
            </IconButton>

            <IconButton
              edge="end"
              aria-label="current user"
              aria-haspopup="true"
              onClick={onClickReview}
              color="inherit"
            >
              <Tooltip title="Revisiones" aria-label="Revisiones">
                <RateReviewIcon />
              </Tooltip>
            </IconButton>

            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              onClick={handleClickLogout}
              color="inherit"
            >
              <p className={classes.logoutIcon}>{logoutText}</p>
              <ExitToAppIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMenu}
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
