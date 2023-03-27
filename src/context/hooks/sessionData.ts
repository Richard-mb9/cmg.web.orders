import { useContext } from 'react';
import { SessionDataContext } from '../sessionData';


export const useSessionData = ()=> useContext(SessionDataContext);