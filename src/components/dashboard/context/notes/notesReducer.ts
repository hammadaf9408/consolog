import { INotesDataCtx } from "./notesContext";

export enum NotesACtion {
  LOAD_ALL_DATA = "@@LOAD_ALL_DATA",
  LOAD_SINGLE_DATA = "@@LOAD_SINGLE_DATA",
}

export const notesReducer = (state: any, action: any): INotesDataCtx => {
  switch (action.type) {

    case NotesACtion.LOAD_ALL_DATA:
      return { ...state, allNotes: action.data};
    
    case NotesACtion.LOAD_SINGLE_DATA:
      return { ...state, singleNote: action.data};

    default:
      return state;
  }
};
