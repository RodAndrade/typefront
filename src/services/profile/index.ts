import { RequestProvider } from '@providers/request';

import { ProfileType } from './types';

class ProfileServices {
  static me(accessToken?: string) {
    return RequestProvider.withAuth<ProfileType>('/api/profile', {
      accessToken,
    });
  }
}

export default ProfileServices;
