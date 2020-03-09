import React, { useReducer } from 'react'
import { IAlert } from './IAlert'
import { alertReducer, AlertAction } from './alertReducer';
import { AlertContext } from './alertContext';

export const AlertState: React.FC<any> = props => {
  const initialState: IAlert = {
    type: undefined,
    message: '',
  };

  const [state, dispatch] = useReducer(alertReducer, initialState);

  // Set alert
  const setAlert = (alert?: IAlert) => {
    if (alert) {
      dispatch({
        type: AlertAction.SET_ALERT,
        alert
      });
    } else {
      dispatch({
        type: AlertAction.SET_ALERT,
        alert: initialState
      });
    }
  }
  
  return (
    <AlertContext.Provider
      value={{
        setAlert,
        alert: state
      }}
    >
      {props.children}
    </AlertContext.Provider>
  )
}
