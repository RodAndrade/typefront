import { ProfileType } from '@services/profile/types';

export type SessionType = {
  user?: ProfileType & {
    accessToken: string;
  };
};
