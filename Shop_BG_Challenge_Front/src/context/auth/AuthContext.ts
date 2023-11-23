import { createContext } from 'react';
import { AuthUserI } from '@/interfaces';

interface AuthContextProps {
  isLoggedIn: boolean;
  user?: AuthUserI;
}

export const AuthContext = createContext({} as AuthContextProps);
