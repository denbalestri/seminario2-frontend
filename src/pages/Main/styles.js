import { makeStyles } from '@material-ui/core/styles';
export default makeStyles(theme => ({
  title: {
    fontSize: 40,
    marginTop: 15,
    justifyContent: 'center',
    display: 'flex',
  },
  containerMain: {
    display: 'flex',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
    marginRight: 10,
    marginLeft: 10,
  },
  search: {
    display: 'flex',
    justifyContent: 'center',
  },
}));
