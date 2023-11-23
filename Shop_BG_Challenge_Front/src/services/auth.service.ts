import { AxiosError } from 'axios';
import { baseApi } from '@/api/base-api';
import { CONSTANTS } from '@/constants';
import { GeneralResponse, UserCredentialsI, AuthUserI } from '@/interfaces';

export const authService = async (
  credentials: UserCredentialsI,
  isLoginSrv?: boolean
): Promise<[unknown, GeneralResponse<AuthUserI> | null]> => {
  try {
    const res = await baseApi.post<GeneralResponse<AuthUserI>>(
      isLoginSrv ? '/auth/login' : '/auth/register',
      credentials
    );

    if (res.status === 200) {
      localStorage.setItem(CONSTANTS.TOKEN_KEY, res.data.token!);
      localStorage.setItem(CONSTANTS.USER_KEY, JSON.stringify(res.data.data));
    }

    return [null, res.data];
  } catch (error) {
    if (error instanceof AxiosError) {
      return [error.response?.data?.message, null];
    }

    return [(error as Error).message, null];
  }
};
