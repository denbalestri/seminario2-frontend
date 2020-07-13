/* eslint-disable no-dupe-keys */
import { fade, makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  grow: {
    flexGrow: 1,
  },
  logo: {
    fontSize: 22,
    fontFamily: 'Ubuntu',
    marginTop: 10,
    color: 'white',
  },
  appbar: {
    /*bbackground: '#6190E8;',
    background: '-webkit-linear-gradient(to right, #A7BFE8, #6190E8)',
    background: 'linear-gradient(to right, #A7BFE8, #6190E8)',*/
    background: '#667db6' /* fallback for old browsers */,
    background:
      '-webkit-linear-gradient(to right, #667db6, #0082c8, #0082c8, #667db6)',
    background: 'linear-gradient(to right, #667db6, #0082c8, #0082c8, #667db6)',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  logoutIcon: {
    fontSize: 15,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: 400,
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '400px !important',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      alignItems: 'center',
    },
    color: '#FFFFFF',
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));
