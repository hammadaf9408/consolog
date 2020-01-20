import { createContext } from 'react';
import { IError } from './IError';

export interface IErrorContext {
  setError: (error: IError) => void;
  resetError: () => void;
}

export const ErrorContext = createContext<IErrorContext | any>({});
