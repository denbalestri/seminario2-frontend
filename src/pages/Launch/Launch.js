import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Login from '../Login';
import Register from '../Register';
import useStyles from './styles';

const Launch = () => {
  const [login, setLogin] = useState(true);
  const classes = useStyles();

  const onClickRegister = () => {
    setLogin(false);
  };
  const onClickLogin = () => {
    setLogin(true);
  };
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      {login ? (
        <Login onClickRegister={onClickRegister} />
      ) : (
        <Register onClickLogin={onClickLogin} />
      )}
    </Grid>
  );
};

export default Launch;
