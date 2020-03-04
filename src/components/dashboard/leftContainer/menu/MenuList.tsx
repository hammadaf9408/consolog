import * as React from 'react'
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
import { NotesContext } from 'components/dashboard/context/notes/notesContext';

interface Props {
}

export type MenuListProps = RouteComponentProps & Props;

export const MenuList: React.FC<MenuListProps> = props => {
  const classes = useStyle();
  const loadingContext = React.useContext(LoadingContext);
  const { loading } = loadingContext;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

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
  
  const notesContext = React.useContext(NotesContext);
  const { loadSingleNote, loadAllNotes } = notesContext;

  return (
    <div style={{ display: 'flex', flexDirection: 'column'}}>
      <Fab color="primary" aria-label="add" className={classes.fabIcon} disabled={loading} onClick={() => loadSingleNote()}>
        <AddIcon />
      </Fab>
      <Fab color="primary" aria-label="add" className={classes.fabIcon} disabled={loading} onClick={loadAllNotes}>
        <RefreshIcon />
      </Fab>
      <Fab color="primary" aria-label="add" className={classes.fabIcon} disabled={loading} >
        <ChatIcon />
      </Fab>
      <div style={{margin: '0 auto'}}>
        <Fab color="primary" aria-label="add" className={classes.fabSetting} disabled={loading} onClick={handleSettings} >
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
            paper: classes.menu
          }}
        >
          <MenuItem className={classes.menuItem} onClick={handleClose}>Profile</MenuItem>
          <MenuItem className={classes.menuItem} onClick={handleClose}>My account</MenuItem>
          <MenuItem className={classes.menuItem} onClick={onLogout}>Logout</MenuItem>
        </Menu>
        
      </div>
    </div>
  )
}