import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';
import GroupIcon from '@material-ui/icons/Group';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import RateReviewIcon from '@material-ui/icons/RateReview';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Tooltip from '@material-ui/core/Tooltip';
import useStyles from './styles';
const Appbar = ({
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
        <div className={classes.grow} />
        <Button color="inherit" onClick={onClickProfessional}>
          Encontra tu Correctora
        </Button>
        <div className={classes.sectionDesktop}>
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

export default Appbar;
