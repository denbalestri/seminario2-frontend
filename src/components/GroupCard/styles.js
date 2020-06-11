import { makeStyles } from '@material-ui/core/styles';
export default makeStyles(theme => ({
  root: {
    marginTop: 20,
    marginRight: 10,
    marginLeft: 10,
    height: 100,
    borderRadius: '1em',
  },
  cardSelected: {
    background: '#1c92d2' /* fallback for old browsers */,
    background:
      '-webkit-linear-gradient(to right, #f2fcfe, #1c92d2)' /* Chrome 10-25, Safari 5.1-6 */,
    background:
      'linear-gradient(to right, #f2fcfe, #1c92d2)' /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */,
  },
}));
