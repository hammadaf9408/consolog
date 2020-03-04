import { IError } from "./IError";

export enum ErrorAction {
  SET_ERROR = "@@SET_ERROR",
}

export const errorReducer = (state: any, action: any): IError => {
  switch (action.type) {

    case ErrorAction.SET_ERROR:
      return { ...state, ...action.error };

    default:
      return state;
  }
};
