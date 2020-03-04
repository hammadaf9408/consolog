import * as React from 'react';
import { INotes } from './INotes';
import { IResponseCollectionState } from 'components/interface';

export interface INotesDataCtx {
  allNotes?: IResponseCollectionState<INotes>;
  singleNote?: INotes;
}

export interface INotesContext extends INotesDataCtx{
  loadAllNotes: () => void;
  loadSingleNote: (data?: INotes) => void;
}

export const NotesContext = React.createContext({} as INotesContext);