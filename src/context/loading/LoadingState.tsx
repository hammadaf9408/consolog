import React, { useReducer } from 'react'
import { ILoading } from './ILoading'
import { loadingReducer, LoadingAction } from './loadingReducer';
import { LoadingContext } from './loadingContext';

export const LoadingState: React.FC<any> = props => {
  const initialState: ILoading = { loading: false };

  const [state, dispatch] = useReducer(loadingReducer, initialState);

  // Set loading
  const setLoading = () => {
    dispatch({
      type: LoadingAction.SET_LOADING,
      loading: true
    });
  }

  // Set loading
  const resetLoading = () => {
    dispatch({
      type: LoadingAction.SET_LOADING,
      loading: false
    });
  }
  
  return (
    <LoadingContext.Provider 
      value={{
        setLoading,
        resetLoading,
        loading: state.loading
      }}
    >
      {props.children}
    </LoadingContext.Provider>
  )
}
