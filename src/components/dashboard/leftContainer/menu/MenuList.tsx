import * as React from 'react'
import { Fab, MenuItem, Menu, WithStyles, withStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RefreshIcon from '@material-ui/icons/Refresh';
import ChatIcon from '@material-ui/icons/ChatOutlined';
import SettingsIcon from '@material-ui/icons/Settings';
import { LoadingContext } from 'context/loading/loadingContext';
import { Cookies } from 'middleware';
import { LOCALNAME } from 'utils/Constant';
import { RouteComponentProps } from 'react-router-dom';
import { NotesContext } from 'components/dashboard/context/notes/notesContext';
import { styles } from 'styles';

interface Props {
}

export type MenuListProps 
  = RouteComponentProps 
  & WithStyles<typeof styles>
  & Props;

const MenuListView: React.FC<MenuListProps> = props => {

  /* ============================================ PROPS =============================================== */
  
  const { classes } = props;

  /* ============================================ USESTATE ============================================ */
  
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  
  /* ============================================ USECONTEXT ========================================== */
  
  const loadingContext = React.useContext(LoadingContext);
  const notesContext = React.useContext(NotesContext);
  
  const { loadSingleNote, loadAllNotes } = notesContext;
  const { loading } = loadingContext;

  /* ============================================ USEEFFECT =========================================== */
  
  
  /* ============================================ OTHERS ============================================== */
  
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
  
  /* ============================================ VIEW ================================================ */

  return (
    <div style={{ display: 'flex', flexDirection: 'column'}}>
      <Fab color="primary" aria-label="add" className={classes.fabIcon} disabled={loading} onClick={() => loadSingleNote()}>
        <AddIcon />
      </Fab>
      <Fab color="primary" aria-label="add" className={classes.fabIcon} disabled={loading} onClick={loadAllNotes}>
        <RefreshIcon />
      </Fab>
      {
        // HAPUS NANTI
        false &&
        <Fab color="primary" aria-label="add" className={classes.fabIcon} disabled={loading} >
          <ChatIcon />
        </Fab>
      }
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

export const MenuList = withStyles(styles)(MenuListView)