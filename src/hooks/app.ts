import { RoutesConstants } from '@constants/routes';
import { AppContext } from '@contexts/app';
import { AppContextOptions } from '@contexts/app/types';
import AuthServices from '@services/auth';
import ProfileServices from '@services/profile';
import { useCallback, useContext, useEffect } from 'react';

export function useApp() {
  const { ...ctx } = useContext<AppContextOptions>(AppContext);

  const handleUser = useCallback(() => {
    ProfileServices.me().then((userResponse) => {
      if (!userResponse.data?.data) {
        return AuthServices.signOut();
      }

      ctx.setUser(userResponse.data.data);
    });
  }, []);

  return {
    ...ctx,
    getUserProfile: handleUser,
  };
}
