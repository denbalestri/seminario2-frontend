import { makeStyles } from '@material-ui/core/styles';
export default makeStyles(theme => ({
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    width: '100%',
  },
  logoTitle: {
    marginBottom: 10,
    fontFamily: 'Ubuntu',
  },
  title: {
    fontFamily: 'Ubuntu',
  },
  subTitle: {
    fontFamily: 'Ubuntu',
    fontSize: 23,
    width: '100%',
    marginTop: 25,
  },
  section: {
    width: '100%',
    height: '100%',
  },
}));
