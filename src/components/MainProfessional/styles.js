import { makeStyles } from '@material-ui/core/styles';
export default makeStyles({
  root: {
    maxWidth: 345,
    borderRadius: '100%',
    transition: '.5s ease',
    marginTop: 40,
    marginLeft: 40,
    '&:hover': {
      opacity: '0.5',
    },
  },
  cardMedia: {
    width: 200,
    height: 200,
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: 900,
    padding: '16px 32px',
  },
  subTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 900,
  },
  section: {
    width: '100%',
    fontFamily: 'Ubuntu',
    transition: '.5s ease',
    opacity: 0,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    msTransform: 'translate(-50%, -50%)',
    textAlign: 'center',
    '&:hover': {
      opacity: '1',
    },
  },
});
