'use client';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

export const useLocalStorage = (
  key: string,
  initialState: string,
): [string, Dispatch<SetStateAction<string>>] => {
  const [state, setState] = useState<string>(initialState);

  useEffect(() => {
    localStorage?.setItem(key, state);
  }, [state, key]);

  useEffect(() => {
    const _value = localStorage?.getItem(key);

    setState(_value || initialState);
  }, []);

  return [state, setState];
};
