import { makeStyles } from '@material-ui/core/styles';
export default makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
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
  title: {
    fontFamily: 'Ubuntu',
    fontSize: 30,
    fontWeight: 700,
  },
  subTitle: {
    fontFamily: 'Ubuntu',
    fontSize: 23,
    width: '100%',
    marginTop: 25,
  },
}));
