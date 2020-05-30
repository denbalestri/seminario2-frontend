import { makeStyles } from '@material-ui/core/styles';
export default makeStyles(theme => ({
  title: {
    fontSize: 40,
    marginTop: 15,
    fontFamily: 'Pangolin, cursive',
    justifyContent: 'center',
    display: 'flex',
  },
  containerMain: {
    display: 'flex',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
  },
  search: {
    display: 'flex',
    justifyContent: 'center',
  },
}));
