import React from "react";
import {
  Typography,
  Grid,
  Hidden,
  Drawer,
  useTheme,
  AppBar,
  Toolbar,
  IconButton,
  Paper
} from "@material-ui/core";
import { useStyle } from "useStyle";
import MenuIcon from "@material-ui/icons/Menu";
import BackIcon from "@material-ui/icons/KeyboardBackspace";
import { MenuList, NoteList } from "../leftContainer";
import { RouteComponentProps } from "react-router-dom";
import { OptionsList, Main } from "../rightContainer";
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import moment from "moment";

interface Props {}

export type HomeProps = RouteComponentProps & Props;

export const Home: React.FC<HomeProps> = props => {
  const classes = useStyle();
  const theme = useTheme();
  // console.log('props', props);

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

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
                  <Typography variant="h6" noWrap>
                    Left bar
                  </Typography>
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
        <Grid item xs={12} sm={8} md={8} lg={8} xl={8} style={{height: '100%'}}>
        <MuiPickersUtilsProvider utils={MomentUtils} libInstance={moment}>
          {/* Right container */}
          <Paper className={classes.rightContainer}>
            <AppBar position="fixed" className={classes.rightAppBar}>
              <Toolbar>
                {/* This icon only show on small width */}
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                  className={classes.menuButton}
                >
                  <MenuIcon />
                </IconButton>
                {/* Back button */}
                <IconButton edge="start" className={classes.backButton} color="inherit" aria-label="menu">
                  <BackIcon />
                </IconButton>
                <Typography variant="h6" noWrap>
                  Note Title
                </Typography>
              </Toolbar>
            </AppBar>
            {/*  */}
            <Grid container spacing={0} className={classes.mainGridContainer}>
              <Grid item xs={12} style={{height: '10%'}}>
                <OptionsList />
              </Grid>
              <Grid item xs={12} style={{height: '90%', paddingBottom: '16px'}}>
                <Main />
              </Grid>
            </Grid>
          </Paper>
        </MuiPickersUtilsProvider>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
