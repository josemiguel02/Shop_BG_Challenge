import { AuthUserI } from '@/interfaces'
import type { AuthStateI } from './AuthProvider'

type AuthActionType =
  | { type: '[Auth] - LOGIN', payload: AuthUserI }

export const AuthReducer = (state: AuthStateI, action: AuthActionType): AuthStateI => {
  switch (action.type) {
    case '[Auth] - LOGIN':
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
      };

    default:
      return state;
  }
};
