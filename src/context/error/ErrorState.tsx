import React, { useReducer } from 'react'
import { IError } from './IError'
import { errorReducer, ErrorAction } from './errorReducer';
import { ErrorContext } from './errorContext';

export const ErrorState: React.FC<any> = props => {
  const initialState: IError = {
    message: '',
    status: 0,
    statusText: ''
  };

  const [state, dispatch] = useReducer(errorReducer, initialState);

  // Set error
  const setError = (error: IError) => {
    dispatch({
      type: ErrorAction.SET_ERROR,
      error
    });

    setTimeout(() => {
      dispatch({
        type: ErrorAction.SET_ERROR,
        error: initialState
      });
    }, 10000)
  }

  // Set error
  const resetError = () => {
    dispatch({
      type: ErrorAction.SET_ERROR,
      error: initialState
    });
  }
  
  return (
    <ErrorContext.Provider
      value={{
        setError,
        resetError,
        error: state
      }}
    >
      {props.children}
    </ErrorContext.Provider>
  )
}
