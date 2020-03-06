import * as React from 'react';
import { notesReducer, NotesACtion } from './notesReducer';
import { INotes } from './INotes';
import { NotesContext, INotesDataCtx } from './notesContext';
import { API_ROUTES } from 'utils/Constant';
import { useApi } from 'components/hooks/useApi';

export const NotesState: React.FC<any> = props => {
  const { getOnApi } = useApi();

  const initialState: INotesDataCtx = { allNotes: undefined, singleNote: undefined };

  const [state, dispatch] = React.useReducer(notesReducer, initialState);

  // load all notes
  const loadAllNotes = () => {
    const next = (res: any) => {
      const data = {
        data: res.data.data,
        count: res.data.count
      };

      dispatch({
        data,
        type: NotesACtion.LOAD_ALL_DATA,
      });
    }

    getOnApi(API_ROUTES.NOTES, next);
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
