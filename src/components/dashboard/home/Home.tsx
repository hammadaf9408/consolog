import React from "react";
import {
  Typography,
  Button,
  Grid,
  Hidden,
  Drawer,
  useTheme,
  AppBar,
  Toolbar,
  IconButton,
  Paper
} from "@material-ui/core";
import { Cookies } from "middleware";
import { LOCALNAME } from "utils/Constant";
import { useStyle } from "useStyle";
import MenuIcon from "@material-ui/icons/Menu";
import { Menu, NoteList } from "../leftContainer";

export const Home: React.FC<any> = props => {
  const classes = useStyle();
  const theme = useTheme();

  const onLogout = () => {
    Cookies.delete(LOCALNAME.TOKEN);
    props.history.push("/login");
  };

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
            <div className={classes.leftContainer}>
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
                  <Menu />
                </Grid>
                <Grid item sm={10} md={10} lg={10} xl={10} style={{ height: "100%" }}>
                  <Paper className={classes.paperNote}>
                    <div className={classes.toolbar} />
                    <NoteList />
                  </Paper>
                  {/* <Drawer
                    style={{ height: "100%" }}
                    classes={{
                      paper: classes.drawerPaper,
                    }}
                    variant="permanent"
                    open
                  >
                    <div className={classes.toolbar} />
                    <NoteList />
                  </Drawer> */}
                </Grid>
              </Grid>
            </div>
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
        <Grid item xs={12} sm={8} md={8} lg={8} xl={8}>
          <div
            className={classes.rightContainer}
            style={{ justifyContent: "center" }}
          >
            <AppBar position="fixed" className={classes.rightAppBar}>
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
                  Right bar
                </Typography>
              </Toolbar>
            </AppBar>
            <div className={classes.toolbar} />
            <Typography variant="h1">Welcome home</Typography>
            <Button
              color="primary"
              size="large"
              variant="contained"
              onClick={onLogout}
            >
              Logout
            </Button>
          </div>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
