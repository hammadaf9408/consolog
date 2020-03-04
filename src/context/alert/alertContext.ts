import { createContext } from 'react';
import { IAlert } from './IAlert';

const alertContext = createContext<IAlert | null>(null);

export default alertContext;
