import { ILoading } from "./ILoading";

export enum LoadingAction {
  SET_LOADING = "@@SET_LOADING",
}

export const loadingReducer = (state: any, action: any): ILoading => {
  switch (action.type) {

    case LoadingAction.SET_LOADING:
      return { ...state, loading: action.loading };

    default:
      return state;
  }
};
