import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { useHistory } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { notification } from 'antd';
import { useDispatch } from 'react-redux';
import { addNotifications } from '../../redux/actions/notifications';
import { SERVIDOR, CLIENTE } from '../../constants/URIs';
import { setUser } from '../../redux/actions/user';

import useStyles from './styles';

const initialState = {
  email: '',
  clave: '',
};

const showError = () => {
  notification.error({
    message: 'Error',
    description: 'La combinación ingresada es invalida, intentelo nuevamente',
  });
};

const Login = ({ onClickRegister }) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
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
    const body = JSON.stringify({
      email: form.email,
      clave: form.clave,
    });
    fetch(SERVIDOR.LOGIN_URL, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body,
    })
      .then(response => {
        return response.json();
      })
      .then(response => {
        if (!response.error) {
          const usuarioBE = response;

          const usuarioFE = {
            firstName: usuarioBE.nombreUsuario,
            lastName: usuarioBE.apellidoUsuario,
            username: usuarioBE.user,
            avatar: '../../../images/person5.jpg',
            rol: usuarioBE.tipoUsuario,
          };

          dispatch(setUser(usuarioFE));
          getNotifications(usuarioBE.user);
          if (usuarioBE.tipoUsuario === 'Autor')
            history.push(CLIENTE.MENUPRINCIPAL_URL);
          else history.push(CLIENTE.TRABAJOS_URL);
        } else {
          showError();
        }
      })
      .catch(error => console.log(error));
  };

  const getNotifications = username => {
    fetch(SERVIDOR.NOTIFICACIONES_URL(username), {
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
  };

  return (
    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
      <div className={classes.paper}>
        <Typography component="h1" variant="h5" className={classes.title}>
          Bienvenido a Correciones Literarias!
        </Typography>

        <Typography component="h2" variant="h6" className={classes.subTitle}>
          Iniciar sesión
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            name="email"
            label="Correo electrónico"
            autoFocus
            onChange={onChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="clave"
            label="Contraseña"
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
            Iniciar sesión
          </Button>
          <Grid container>
            <Grid item>
              <Button onClick={onClickRegister}>
                {'No tienes cuenta? Registrate'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Grid>
  );
};

export default Login;
