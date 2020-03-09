import React from "react";
import {
  Grid,
  Hidden,
  Drawer,
  useTheme,
  AppBar,
  Toolbar,
  IconButton,
  Paper,
  WithStyles,
  withStyles,
  Snackbar,
  Fade
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { MenuList, NoteList } from "../leftContainer";
import { RouteComponentProps } from "react-router-dom";
import { Main } from "../rightContainer";
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import moment from "moment";
import { styles } from 'styles';
import { AlertContext } from "context/alert/alertContext";
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

interface Props {}

export type HomeProps 
  = RouteComponentProps 
  & WithStyles<typeof styles>
  & Props;

const HomeView: React.FC<HomeProps> = props => {
  
  /* ============================================ PROPS =============================================== */
  
  const { classes } = props;
  const theme = useTheme();

  /* ============================================ USESTATE ============================================ */
  
  const [mobileOpen, setMobileOpen] = React.useState<boolean>(false);
  const [openNotif, setOpenNotif] = React.useState<boolean>(false);
  
  /* ============================================ USECONTEXT ========================================== */
  
  const alertContext = React.useContext(AlertContext);
  const { alert, setAlert } = alertContext;
  
  /* ============================================ USEEFFECT =========================================== */
  
  React.useEffect(() => {
    console.log('render alert')
    if (alert.type) {
      setOpenNotif(true);
    } else {
      setOpenNotif(false);
    }
  }, [alert])
  
  /* ============================================ OTHERS ============================================== */
  
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const Alert = (props: AlertProps) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const handleCloseNotif = () => {
    setOpenNotif(false);
    setAlert();
  }
  /* ============================================ VIEW ================================================ */

  return (
    <React.Fragment>
      <Grid container spacing={0} style={{ height: "100%" }}>
        {/* Website Mode */}
        <Hidden xsDown>
          <Grid item sm={4} md={4} lg={4} xl={4} style={{ height: "100%" }}>
            {/* Left Container */}
            <Paper className={classes.leftContainer}>
              <AppBar position="fixed" className={classes.leftAppBar}>
                <Toolbar>
                  <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    className={classes.menuButton}
                  >
                    <MenuIcon />
                  </IconButton>
                  {/* <Typography variant="h6" noWrap>
                    Left bar
                  </Typography> */}
                </Toolbar>
              </AppBar>
              <Grid container spacing={0} style={{ height: "100%" }}>
                <Grid item sm={2} md={2} lg={2} xl={2} style={{ height: "100%" }} >
                  <div className={classes.toolbar} />
                  <MenuList {...props} />
                </Grid>
                <Grid item sm={10} md={10} lg={10} xl={10} style={{ height: "100%", paddingTop: '4px' }}>
                  <div className={classes.noteList}>
                    <div className={classes.toolbar} />
                    <NoteList />
                  </div>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Hidden>

        {/* Mobile mode */}
        <Hidden smUp>
          <Drawer
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            <NoteList />
          </Drawer>
        </Hidden>
        <Grid item xs={12} sm={8} md={8} lg={8} xl={8} style={{height: '100%', position: 'relative'}}>
          {/* Right container */}
          <MuiPickersUtilsProvider utils={MomentUtils} libInstance={moment}>
            <Main />
          </MuiPickersUtilsProvider>
          <Snackbar 
            open={openNotif} 
            key={`top, center`} 
            anchorOrigin={{vertical: 'top', horizontal: 'center'}} 
            style={{position: 'absolute', top: '72px'}}
            autoHideDuration={3000}
            onClose={handleCloseNotif}
            TransitionComponent={Fade}
          >
            <Alert severity={alert.type}>{alert.message}</Alert>
          </Snackbar>
        </Grid>        
      </Grid>
    </React.Fragment>
  );
};

export const Home = withStyles(styles)(HomeView)