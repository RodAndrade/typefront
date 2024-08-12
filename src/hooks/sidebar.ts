'use client';
import { useLocalStorage } from './localStorage';

export const useSidebar = (value: boolean = true) => {
  const [state, setState] = useLocalStorage('rn_sidebar', String(value));

  return {
    open: Boolean(state),
    toggle: () => {
      setState(state === 'true' ? 'false' : 'true');
    },
  };
};
