import { createContext } from 'react';
import { IError } from './IError';

export interface IErrorContext {
  setError: (error: IError) => void;
  error: IError;
}

export const ErrorContext = createContext({} as IErrorContext);
