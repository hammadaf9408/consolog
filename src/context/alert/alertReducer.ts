import { IAlert } from './IAlert';

export enum AlertAction {
  SET_ALERT = '@@SET_ALERT',
}

export const alertReducer = (state: any, action: any): IAlert => {
  switch (action.type) {
    case AlertAction.SET_ALERT:
      return { ...state, ...action.alert };

    default:
      return state;
  }
}