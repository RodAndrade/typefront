import { ReactNode, Dispatch, SetStateAction } from 'react';

export type DispatchEvent<T> = Dispatch<SetStateAction<T>>;

export type DefaultProps<P = object, E = object> = P & {
  className?: string;
} & E;

export type DefaultPropsWithChildren<P = object, E = object> = DefaultProps<
  P,
  E
> & {
  children?: ReactNode;
};
