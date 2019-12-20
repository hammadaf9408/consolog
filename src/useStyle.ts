import { Theme, makeStyles } from "@material-ui/core";

export const useStyle = makeStyles((theme: Theme) => ({
  mainContainer: {
    maxWidth: '80vw',
    maxHeight: '85vh',
    margin: '0',
    padding: '0',
    overflow: 'hidden',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: theme.spacing(1),
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',

    // For initial, delete later
    backgroundColor: '#cfe8fc',
    height: '85vh'
  },
  leftContainer: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6c7b95',
    borderRight: '1px solid black'
    // backgroundImage: 'url(/images/sign_up_1.jpg)',
    // backgroundSize: 'cover',
    // backgroundRepeat: 'no-repeat',
    // backgroundPosition: 'center'
  },
  leftInner: {
    textAlign: 'center',
    flexBasis: '600px'
  },
  subTitle: {
    marginTop: '20px'
  },
  rightContainer: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#8bbabb',
  },
  authField: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    // [theme.breakpoints.down('md')]: {
    //   justifyContent: 'center'
    // }
  },
  fields: {
    width: '100%',
    '& + & ': {
      marginTop: theme.spacing(2)
    }
  },
  fieldError: {
    color: theme.palette.error.main,
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(1)
  },
  signInButton: {
    marginTop: theme.spacing(2),
    width: '100%'
  },
  signInForm: {
    padding: theme.spacing(5),
    flexBasis: '100%'
  },
  signUpInfo: {
    marginTop: theme.spacing(2),
  }
}));