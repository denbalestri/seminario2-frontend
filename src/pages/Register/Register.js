import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { Upload } from 'antd';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { UploadOutlined } from '@ant-design/icons';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import useStyles from './styles';
const initialState = {
  firstName: '',
  lastName: '',
  password: '',
  email: '',
};
const Register = () => {
  const classes = useStyles();
  const signUpText = 'Registraci\u00F3n';
  const emailText = 'Correo electr\u00F3nico';
  const passwordText = 'Contrase\u00F1a';
  const [fileList, setFileList] = useState([]);
  const [file, setFile] = useState({});
  const [form, setForm] = useState(initialState);

  const onChange = (name, e) => {
    const value = e.target.value;
    setForm({
      ...form,
      [name]: value,
    });
  };
  const handleChange = info => {
    setFile(info.file);
    setFileList(info.fileList.slice(-1));
  };

  const uploadProps = {
    name: 'avatar',
    listType: 'picture',
    customRequest: ({ onSuccess }) => setTimeout(() => onSuccess('ok'), 0),
    fileList,
    onChange: handleChange,
  };
  const onClickSubmit = () => {
    //send data to backend
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
          <Typography component="h1" variant="h5">
            {signUpText}
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
                <Upload {...uploadProps} onChange={handleChange}>
                  <Button color="primary" variant="outlined">
                    <UploadOutlined /> Elegir foto
                  </Button>
                </Upload>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={onClickSubmit}
            >
              Registrarse
            </Button>
          </form>
        </div>
      </Container>
    </section>
  );
};

export default Register;
