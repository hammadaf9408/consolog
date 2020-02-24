import React, { useContext } from 'react'
import { useStyle } from 'useStyle';
import { Fab, MenuItem, Menu } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RefreshIcon from '@material-ui/icons/Refresh';
import ChatIcon from '@material-ui/icons/ChatOutlined';
import SettingsIcon from '@material-ui/icons/Settings';
import { LoadingContext } from 'context/loading/loadingContext';
import { Cookies } from 'middleware';
import { LOCALNAME } from 'utils/Constant';
import { RouteComponentProps } from 'react-router-dom';

interface Props {
  // coba: string;
}

export type MenuListProps = RouteComponentProps & Props;

export const MenuList: React.FC<MenuListProps> = props => {
  const classes = useStyle();
  const loadingContext = useContext(LoadingContext);
  const { loading, setLoading, resetLoading } = loadingContext;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  // console.log('menu Props', props);

  const handleSettings = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onLogout = () => {
    Cookies.delete(LOCALNAME.TOKEN);
    props.history.push("/");
  };
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column'}}>
      <Fab color="primary" aria-label="add" className={classes.fabIcon} disabled={loading}>
        <AddIcon />
      </Fab>
      <Fab color="primary" aria-label="add" className={classes.fabIcon} onClick={() => {
        if (loading) {
          resetLoading()
        } else {
          setLoading()
        }
      }}>
        <RefreshIcon />
      </Fab>
      <Fab color="primary" aria-label="add" className={classes.fabIcon} disabled={loading}>
        <ChatIcon />
      </Fab>
      <div style={{margin: '0 auto'}}>
        <Fab color="primary" aria-label="add" className={classes.fabSetting} onClick={handleSettings} >
          <SettingsIcon />
        </Fab>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          classes={{
            paper: classes.settingsMenu
          }}
        >
          <MenuItem className={classes.settingsMenuItem} onClick={handleClose}>Profile</MenuItem>
          <MenuItem className={classes.settingsMenuItem} onClick={handleClose}>My account</MenuItem>
          <MenuItem className={classes.settingsMenuItem} onClick={onLogout}>Logout</MenuItem>
        </Menu>
        
      </div>
    </div>
  )
}