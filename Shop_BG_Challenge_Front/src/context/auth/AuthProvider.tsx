import { useReducer, ReactNode, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import { AuthReducer } from './AuthReducer';
import { AuthUserI } from '@/interfaces';
import { CONSTANTS } from '@/constants';

export interface AuthStateI {
  isLoggedIn: boolean;
  user?: AuthUserI;
}

const INITIAL_STATE: AuthStateI = {
  isLoggedIn: false,
  user: undefined,
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  const loadUser = () => {
    const token = localStorage.getItem(CONSTANTS.TOKEN_KEY);
    const user = localStorage.getItem(CONSTANTS.USER_KEY);

    if (token && user) {
      const payload = JSON.parse(user);
      dispatch({ type: '[Auth] - LOGIN', payload });
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...state,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
