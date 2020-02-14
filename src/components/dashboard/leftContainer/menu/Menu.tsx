import React from 'react'
import { useStyle } from 'useStyle';
import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RefreshIcon from '@material-ui/icons/Refresh';
import ChatIcon from '@material-ui/icons/Chat';
import SettingsIcon from '@material-ui/icons/Settings';

export const Menu: React.FC<any> = props => {
  const classes = useStyle();

  return (
    <div style={{ display: 'flex', flexDirection: 'column'}}>
      <Fab color="primary" aria-label="add" className={classes.fabIcon}>
        <AddIcon />
      </Fab>
      <Fab color="primary" aria-label="add" className={classes.fabIcon}>
        <RefreshIcon />
      </Fab>
      <Fab color="primary" aria-label="add" className={classes.fabIcon}>
        <ChatIcon />
      </Fab>
      <div style={{margin: '0 auto'}}>
        <Fab color="primary" aria-label="add" className={classes.fabSetting} >
          <SettingsIcon />
        </Fab>
      </div>
    </div>
  )
}
