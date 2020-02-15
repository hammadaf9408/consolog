import React, { useContext } from 'react'
import { useStyle } from 'useStyle';
import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RefreshIcon from '@material-ui/icons/Refresh';
import ChatIcon from '@material-ui/icons/Chat';
import SettingsIcon from '@material-ui/icons/Settings';
import { LoadingContext } from 'context/loading/loadingContext';

export const Menu: React.FC<any> = props => {
  const classes = useStyle();
  const loadingContext = useContext(LoadingContext);
  const { loading, setLoading, resetLoading } = loadingContext;
  
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
        <Fab color="primary" aria-label="add" className={classes.fabSetting} >
          <SettingsIcon />
        </Fab>
      </div>
    </div>
  )
}
