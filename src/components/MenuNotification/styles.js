import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  typography: {
    fontSize: 20,
    padding: theme.spacing(2),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));
