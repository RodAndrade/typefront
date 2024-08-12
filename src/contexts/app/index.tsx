'use client';

import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

// import { useBuildId } from '@main/hooks/useBuildId';

import { DefaultPropsWithChildren } from '@app/types/generic';
import { AppContextOptions } from './types';
import { ProfileType } from '@services/profile/types';
import ProfileServices from '@services/profile';

export const AppContext = createContext({} as AppContextOptions);

export function AppProvider({ children }: DefaultPropsWithChildren) {
  // const { buildId } = useBuildId();

  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [userState, setUserState] = useState<ProfileType>();

  return (
    <AppContext.Provider
      value={{
        version: '',

        user: userState,
        setUser: setUserState,

        sidebarOpen: isSidebarOpen,
        setSidebarOpen: setIsSidebarOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
