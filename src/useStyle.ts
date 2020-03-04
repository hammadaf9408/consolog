import { Theme, makeStyles } from "@material-ui/core";

const purpleBg = '#464159';
const green = '#8bbabb';
const gray = '#6c7b95';
const white = '#fff';

// const black = '#1b262c';
// const darkBlue = '#0f4c75';
// const blue = '#3282b8';
// const lightBlue = '#bbe1fa';

const drawerWidth = '33.3%';
const gridXl2 = '16.666667%';
// const gridXl10 = '83.333333%';

export const useStyle = makeStyles((theme: Theme) => ({
  toolbar: theme.mixins.toolbar,
  '@global': {
    '*': {
      boxSizing: 'border-box',
      margin: 0,
      padding: 0
    },
    'body': {
      backgroundColor: purpleBg
    },
    '::-webkit-scrollbar': {
      width: '5px'
    },
    '::-webkit-scrollbar-track': {
      background: green
    },
    '::-webkit-scrollbar-thumb': {
      background: gray
    },
    '::-webkit-scrollbar-thumb:hover': {
      background: purpleBg
    },
    '.MuiOutlinedInput-input:-webkit-autofill': {
      '-webkit-box-shadow': 'none',
      '-moz-box-shadow': 'none',
      'box-shadow': 'none'
    },
    'input:-webkit-autofill, input:-webkit-autofill:hover, input:-webkit-autofill:focus, input:-webkit-autofill:active': {
      transition: 'background-color 5000s ease-in-out 0s'
    }
  },
  mainContainer: {
    height: '100vh',
    padding: '0',
    [theme.breakpoints.up('lg')]: {
      maxWidth: '80vw',
      maxHeight: '85vh',
      margin: '0',
      // padding: '0',
      overflow: 'hidden',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      borderRadius: theme.spacing(1),
      boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
  
      // For initial, delete later
      // backgroundColor: purpleBg,
      height: '85vh'
    },
  },
  leftContainer: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: gray,
    borderRight: `1px solid ${purpleBg}`

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
    backgroundColor: green,
  },
  authField: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
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
  },
  buttonWrapper: {
    position: 'relative',
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -8,
    marginLeft: -12,
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: `calc(${drawerWidth} - ${gridXl2})`,
    background: green,
    // position: 'inherit'
    left: 'auto'
  },
  leftAppBar: {
    backgroundColor: '#0f4c75',
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      left: 0,
      zIndex: theme.zIndex.drawer + 1,
    },
  },
  rightAppBar: {
    backgroundColor: '#0f4c75',
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth})`,
      zIndex: theme.zIndex.drawer + 1,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  backButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  fabIcon: {
    margin: '12px auto',
    [theme.breakpoints.only('md')]: {
      width: '46px',
      height: '46px'
    },
    [theme.breakpoints.down('sm')]: {
      width: '40px',
      height: '40px'
    },
  },
  fabSetting: {
    position: 'absolute', 
    transform: 'translateX(-50%)', 
    bottom: '20px',
    [theme.breakpoints.only('md')]: {
      width: '46px',
      height: '46px'
    },
    [theme.breakpoints.down('sm')]: {
      width: '40px',
      height: '40px'
    },
  },
  noteList: {
    height: '100%',
    overflowX: 'auto',
    background: green,
  },
  textElipsis: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis'
  },
  skeleton: {
    backgroundColor: `${gray} !important`
  },
  colorError: {
    color: theme.palette.error.main
  },
  colorPrimary: {
    color: theme.palette.primary.dark
  },
  colorSuccess: {
    color: theme.palette.success.dark
  },
  menu: {
    color: white,
    backgroundColor: purpleBg
  },
  menuItem: {
    '&:hover': {
      backgroundColor: theme.palette.primary.main
    },
  },
  menuItemError: {
    '&:hover': {
      backgroundColor: theme.palette.error.dark
    },
  },
  options: {
    width: '95%', 
    height: '100%',
    margin: '0px auto', 
    display: 'flex', 
    flexDirection: 'row'
  },
  optionsFab: {
    display: 'flex', 
    flexDirection: 'row',
     width: '50%', 
     justifyContent: 'flex-end'
  },
  optionsFabItem: {
    margin: 'auto 8px'
  },
  dueDate: {
    color: theme.palette.error.dark
  },
  mainDiv: {
    height: "100%",
    width: "95%",
    margin: "0 auto",
    display: "flex",
    flexDirection: "row"
  },
  mainField: {
    margin: '0',
    height: '100%',
    '& .MuiInputBase-root': {
      height: '100%'
    }
  },
  mainFieldInput: {
    height: '100% !important',
    overflow: 'auto !important',
  },
  mainGridContainer: {
    height: '100%',
    paddingTop: '64px'
  }
}));