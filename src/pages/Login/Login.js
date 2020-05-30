import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import Typography from '@material-ui/core/Typography';

import useStyles from './styles';
const initialState = {
  email: '',
  clave: '',
};
const Login = () => {
  const classes = useStyles();
  const loginText = 'Iniciar sesi\u00F3n';
  const passwordText = 'Contrase\u00F1a';
  const emailText = 'Correo electr\u00F3nico';
  const [form, setForm] = useState(initialState);

  const onChange = e => {
    const value = e.target.value;
    const name = e.target.name;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const onClickSubmit = () => {
    //send data to backend and verify (form)
  };
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Typography component="h1" variant="h5" className={classes.title}>
            Bienvenido a Correciones Literarias!
          </Typography>

          <Typography component="h2" variant="h6" className={classes.subTitle}>
            {loginText}
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              name="email"
              label={emailText}
              autoFocus
              onChange={onChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="clave"
              label={passwordText}
              type="password"
              id="clave"
              autoComplete="current-password"
              onChange={onChange}
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={onClickSubmit}
            >
              {loginText}
            </Button>
            <Grid container>
              <Grid item>
                <Link to="/registracion">{'No tienes cuenta? Registrate'}</Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

export default Login;
