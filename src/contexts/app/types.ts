import { DispatchEvent } from '@app/types/generic';
import { ProfileType } from '@services/profile/types';

export interface AppContextOptions {
  version: string;

  user?: ProfileType;
  setUser: DispatchEvent<ProfileType | undefined>;

  sidebarOpen: boolean;
  setSidebarOpen: DispatchEvent<boolean>;
}
