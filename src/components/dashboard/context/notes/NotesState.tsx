import * as React from 'react';
import { notesReducer, NotesACtion } from './notesReducer';
import { INotes } from './INotes';
import { NotesContext, INotesDataCtx } from './notesContext';
import { AxiosResponse } from 'axios';
import { ApiCall } from 'middleware';
import { API_ROUTES, CONFIG_AXIOS } from 'utils/Constant';
import { LoadingContext } from 'context/loading/loadingContext';
import { ErrorContext } from 'context/error/errorContext';
import { IError } from 'context/error/IError';

export const NotesState: React.FC<any> = props => {
  const initialState: INotesDataCtx = { allNotes: undefined, singleNote: undefined };

  const [state, dispatch] = React.useReducer(notesReducer, initialState);

  const loadingContext = React.useContext(LoadingContext);
  const errorContext = React.useContext(ErrorContext);

  const { setLoading, resetLoading } = loadingContext;
  const { setError } = errorContext;

  // load all notes
  const loadAllNotes = async () => {
    setLoading();
    let res: AxiosResponse<any> = await ApiCall.get(API_ROUTES.NOTES, CONFIG_AXIOS.WITHAUTH); 
    if (res) {
      if (res.status === 200) {
        const data = {
          data: res.data.data,
          count: res.data.count
        };

        dispatch({
          data,
          type: NotesACtion.LOAD_ALL_DATA,
        });
      } else {
        alert('Error on load notes');
        const err: IError = {
          status: res.status,
          statusText: res.statusText,
          message: res.data.error || 'Error'
        }
        setError(err);
      }
      resetLoading();
    }
  }

  // load single note
  const loadSingleNote = (data?: INotes) => {
    dispatch({
      data,
      type: NotesACtion.LOAD_SINGLE_DATA,
    });
  }

  return (
    <NotesContext.Provider 
      value={{
        loadAllNotes,
        loadSingleNote,
        allNotes: state.allNotes,
        singleNote: state.singleNote
      }}
    >
      {props.children}
    </NotesContext.Provider>
  )
}
