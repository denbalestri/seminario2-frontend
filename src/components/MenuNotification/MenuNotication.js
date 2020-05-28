import React from 'react';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';
import Popover from '@material-ui/core/Popover';
import useStyles from './styles';

const MenuNotification = ({ open, anchorEl, handleMenuClose }) => {
  const classes = useStyles();
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
};

export default MenuNotification;
