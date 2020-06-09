import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '../../components/Button';
import { Upload, notification } from 'antd';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { UploadOutlined } from '@ant-design/icons';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import useStyles from './styles';
import { SERVIDOR, CLIENTE } from '../../constants/URIs';
import Select from '../../components/Select';
import { getBase64 } from '../../constants/base64';
import './Register.css';

const initialState = {
  firstName: '',
  lastName: '',
  password: '',
  email: '',
  username: '',
  rol: '',
  descripcion: '',
};

const Register = () => {
  const classes = useStyles();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const signUpText = 'Registraci\u00F3n';
  const emailText = 'Correo electr\u00F3nico';
  const passwordText = 'Contrase\u00F1a';
  const [fileList, setFileList] = useState([]);
  const [file, setFile] = useState(null);
  const [cvFileList, setCVFileList] = useState([]);
  const [cv, setCVFile] = useState(null);
  const [form, setForm] = useState(initialState);

  const onChange = e => {
    const value = e.target.value;
    const name = e.target.name;
    setForm({
      ...form,
      [name]: value,
    });
  };
  const onChangeRole = value => {
    setForm({
      ...form,
      rol: value,
    });
  };
  const handleChange = info => {
    setFile(info.file);
    setFileList(info.fileList.slice(-1));
  };

  const handleUploadCV = info => {
    setCVFile(info.file);
    setCVFileList(info.fileList.slice(-1));
  };

  const uploadProps = {
    name: 'avatar',
    listType: 'picture',
    customRequest: ({ onSuccess }) => setTimeout(() => onSuccess('ok'), 0),
    fileList,
    onChange: handleChange,
  };

  const uploadPropsCV = {
    name: 'cv',
    listType: 'picture',
    customRequest: ({ onSuccess }) => setTimeout(() => onSuccess('ok'), 0),
    cvFileList,
    onChange: handleUploadCV,
  };

  const showSuccess = () => {
    notification.success({
      message: 'Éxito',
      description: 'El registro fue exitoso!',
      onClose: onRedirect,
    });
  };

  const onRedirect = () => {
    history.push(CLIENTE.LOGIN_URL);
  };
  const onClickSubmit = () => {
    setLoading(true);
    if (file) {
      getBase64(file.originFileObj).then(encodedAvatar => {
        if (cv) {
          getBase64(cv.originFileObj).then(encodedCV => {
            const body = JSON.stringify({
              tipoUsuario: '2',
              nombre: form.firstName,
              apellido: form.lastName,
              mail: form.email,
              clave: form.password,
              usr: form.username,
              avatar: encodedAvatar,
              cv: encodedCV,
              descripcion: form.description,
            });

            fetch(SERVIDOR.REGISTRO_URL, {
              method: 'POST',
              mode: 'cors',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
              body,
            })
              .then(response => {
                if (response.ok) {
                  showSuccess();
                  setLoading(false);
                }
              })
              .catch(error => {
                setLoading(false);
                console.log(error);
              });
          });
        } else {
          const body = JSON.stringify({
            tipoUsuario: '1',
            nombre: form.firstName,
            apellido: form.lastName,
            mail: form.email,
            clave: form.password,
            usr: form.username,
            avatar: encodedAvatar,
            cv: '',
            descripcion: '',
          });

          fetch(SERVIDOR.REGISTRO_URL, {
            method: 'POST',
            mode: 'cors',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body,
          })
            .then(response => {
              if (response.ok) {
                showSuccess();
                setLoading(false);
              }
            })
            .catch(error => {
              setLoading(false);
              console.log(error);
            });
        }
      });
    }
  };
  return (
    <section
      style={{
        width: '100%',
        height: '100%',
      }}
    >
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" className={classes.title}>
            {signUpText}
          </Typography>
          <Typography component="h1" variant="h5" className={classes.subTitle}>
            Datos Personales
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="Nombre"
                  autoFocus
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Apellido"
                  name="lastName"
                  autoComplete="lname"
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label={emailText}
                  name="email"
                  autoComplete="email"
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label={passwordText}
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="username"
                  label="Nombre usuario"
                  id="username"
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={6}>
                <Select
                  placeholder={'Seleccione su Rol'}
                  optionItems={['Autor', 'Corrector']}
                  valueSelected={form.rol}
                  onChange={onChangeRole}
                />
              </Grid>
              {form.rol === 'Corrector' && (
                <>
                  <Grid item xs={6}>
                    <Upload {...uploadPropsCV} onChange={handleUploadCV}>
                      <Button
                        color="primary"
                        variant="outlined"
                        style={{ width: '100%' }}
                      >
                        <UploadOutlined style={{ marginRight: '10px' }} />
                        Cargar CV
                      </Button>
                    </Upload>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      multiline
                      rows={4}
                      required
                      fullWidth
                      id="description"
                      label="Descripción personal"
                      name="description"
                      autoComplete="descripcion"
                      onChange={onChange}
                    />
                  </Grid>
                </>
              )}
              <Grid item xs={12} align>
                <Upload {...uploadProps} onChange={handleChange}>
                  <Button color="primary" variant="outlined">
                    <UploadOutlined style={{ marginRight: '10px' }} />
                    Elegir foto
                  </Button>
                </Upload>
              </Grid>
            </Grid>
            <Button
              type="primary"
              className={classes.submit}
              onClick={onClickSubmit}
              loading={loading}
            >
              Registrarse
            </Button>
            <Grid container>
              <Grid item>
                <Link to="/iniciar-sesion">
                  {'Tienes cuenta? Inicia sesion'}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </section>
  );
};

export default Register;
