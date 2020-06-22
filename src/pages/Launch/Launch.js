import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Login from '../Login';
import Register from '../Register';
import useStyles from './styles';

const Launch = () => {
  const [visibleLogin, setVisibleLogin] = useState(true);
  const classes = useStyles();

  const onClickRegister = () => {
    setVisibleLogin(false);
  };
  const onClickLogin = () => {
    setVisibleLogin(true);
  };
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      {visibleLogin ? (
        <Login onClickRegister={onClickRegister} />
      ) : (
        <Register onClickLogin={onClickLogin} />
      )}
    </Grid>
  );
};

export default Launch;
