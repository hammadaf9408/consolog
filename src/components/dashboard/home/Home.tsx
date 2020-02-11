import React from 'react'
import { Typography, Button, Grid, Divider, List, ListItem, ListItemIcon, ListItemText, Hidden, Drawer, useTheme, AppBar, Toolbar, IconButton } from '@material-ui/core'
import { Cookies } from 'middleware'
import { LOCALNAME } from 'utils/Constant'
import { useStyle } from 'useStyle';
import MailIcon from '@material-ui/icons/Mail';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MenuIcon from '@material-ui/icons/Menu';

export const Home: React.FC<any> = props => {
  const classes = useStyle();
  const theme = useTheme();

  const onLogout = () => {
    Cookies.delete(LOCALNAME.TOKEN)
    props.history.push('/login');
  }

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      Title
      <Divider />
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <React.Fragment>
      <Grid container spacing={0} style={{height: '100%'}}>
        <Grid item xs={12} md={4} lg={4} xl={4}>
          <div className={classes.leftContainer}>
            <AppBar position="fixed" className={classes.appBar}>
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
                  Responsive drawer
                </Typography>
              </Toolbar>
            </AppBar>
            <Hidden smUp implementation="css">
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
                {drawer}
              </Drawer>
            </Hidden>
            <Hidden xsDown implementation="css">
              <Drawer
                classes={{
                  paper: classes.drawerPaper,
                }}
                variant="permanent"
                open
              >
                {drawer}
              </Drawer>
            </Hidden>
          </div>
        </Grid>
        <Grid item xs={12} md={8} lg={8} xl={8}>
          <div className={classes.rightContainer} style={{justifyContent: 'center'}}>
            <Typography variant="h1">
              Welcome home
            </Typography>
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
  )
}
