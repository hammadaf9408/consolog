import { createContext } from 'react';
import { ILoading } from './ILoading';

export interface ILoadingContext extends ILoading {
  setLoading: () => void;
  resetLoading: () => void;
}

export const LoadingContext = createContext({} as ILoadingContext);
