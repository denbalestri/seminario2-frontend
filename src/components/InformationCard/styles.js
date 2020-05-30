import { makeStyles } from '@material-ui/core/styles';
export default makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    height: 500,
    width: 500,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    width: 300,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
}));
