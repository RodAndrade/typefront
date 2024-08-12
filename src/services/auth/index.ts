import Cookies from 'js-cookie';

import { RequestProvider } from '@providers/request';

import {
  SignInResponseType,
  SignUpBodyType,
  SignUpResponseType,
} from './types';
import { CookiesConstants } from '@constants/cookies';
import { RoutesConstants, getRoute } from '@constants/routes';

class AuthServices {
  static async signIn(email: string, password: string): Promise<string | null> {
    const response = await RequestProvider.request<SignInResponseType>(
      '/api/auth/sign-in',
      {
        method: 'POST',
        data: {
          email,
          password,
        },
      },
    );

    const accessToken = response?.data?.data?.token;
    if (!accessToken) {
      return null;
    }

    Cookies.set(CookiesConstants.ACCESS_TOKEN, accessToken, {
      expires: 7,
      secure: true,
      sameSite: 'strict',
    });

    return accessToken;
  }

  static async signUp(
    data: SignUpBodyType,
  ): Promise<SignUpResponseType | null> {
    const response = await RequestProvider.request<SignUpResponseType>(
      '/api/auth/sign-up',
      {
        method: 'POST',
        data,
      },
    );

    const user = response?.data?.data;
    if (!user?.id) {
      return null;
    }

    return user;
  }

  static async signOut() {
    Cookies.remove(CookiesConstants.ACCESS_TOKEN);

    if (window?.location?.href) {
      window.location.href = getRoute(RoutesConstants.SIGN_IN);
    }
  }
}

export default AuthServices;
