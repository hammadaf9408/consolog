import { createContext } from 'react';
import { IAlert } from './IAlert';

export interface IAlertContext {
  setAlert: (alert?: IAlert) => void;
  alert: IAlert;
}

export const AlertContext = createContext({} as IAlertContext)