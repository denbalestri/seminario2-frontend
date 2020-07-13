import { makeStyles } from '@material-ui/core/styles';
export default makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  root: {
    display: 'flex',
    width: '600px',
    justifyContent: 'space-around',
    alignItems: 'center',
    border: '4px solid #0038e17a',
    padding: '5px 0',
    borderRadius: '10px',
  },
  section: {
    marginRight: 20,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  rating: {
    fontSize: 20,
    marginBottom: 0,
  },
  searchButton: {
    justifySelf: 'flex-end',
    color: 'rgba(0, 56, 225, 0.74)',
    transform: 'scale(1.7)',
  },
  select: {
    width: 180,
    marginRight: 20,
  },
  inputGenre: {
    fontSize: 20,
  },
}));
