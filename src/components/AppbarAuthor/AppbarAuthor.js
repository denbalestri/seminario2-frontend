import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';

import GroupIcon from '@material-ui/icons/Group';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import RateReviewIcon from '@material-ui/icons/RateReview';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Tooltip from '@material-ui/core/Tooltip';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import useStyles from './styles';
const AppbarAuthor = ({
  onClickGroup,
  onClickNotifications,
  notificationsBadge,
  onClickReview,
  handleClickLogout,
  onClickProfessional,
}) => {
  const classes = useStyles();
  const logoutText = 'Cerrar sesi\u00F3n';
  return (
    <AppBar position="static" className={classes.appbar}>
      <Toolbar>
        <Link to="/menu">
          <p className={classes.logo}>Correciones Literarias</p>
        </Link>
        <div className={classes.grow} />
        <div className={classes.sectionDesktop}>
          <IconButton color="inherit" onClick={onClickProfessional}>
            <Tooltip title="Profesionales" aria-label="Profesionales">
              <LocalLibraryIcon />
            </Tooltip>
          </IconButton>
          <IconButton color="inherit" onClick={onClickGroup}>
            <Tooltip title="Grupos" aria-label="Grupos">
              <GroupIcon />
            </Tooltip>
          </IconButton>
          <IconButton color="inherit" onClick={onClickNotifications}>
            <Tooltip title="Notificaciones" aria-label="Notificaciones">
              <Badge badgeContent={notificationsBadge} color="secondary">
                <NotificationsIcon />
              </Badge>
            </Tooltip>
          </IconButton>

          <IconButton onClick={onClickReview} color="inherit">
            <Tooltip title="Revisiones" aria-label="Revisiones">
              <RateReviewIcon />
            </Tooltip>
          </IconButton>

          <IconButton onClick={handleClickLogout} color="inherit">
            <Tooltip title={logoutText} aria-label={logoutText}>
              <ExitToAppIcon />
            </Tooltip>
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default AppbarAuthor;
