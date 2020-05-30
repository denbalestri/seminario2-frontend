import { makeStyles } from '@material-ui/core/styles';
export default makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  title: {
    fontSize: 40,
    marginTop: 30,
    fontFamily: 'Pangolin, cursive',
    justifyContent: 'center',
    display: 'flex',
  },
  section: {
    display: 'flex',
    flexFlow: 'wrap',
  },
  search: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 30,
  },
}));
