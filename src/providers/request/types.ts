import { AxiosRequestConfig } from 'axios';

export type FileType = {
  param: string;
  file: Blob;
  name?: string;
};

export type RequestOptionsType<TData = any> = {
  accessToken?: string;
  auth?: boolean;
  baseUrl?: string;
  method?: AxiosRequestConfig['method'];
  headers?: AxiosRequestConfig['headers'];
  params?: AxiosRequestConfig['params'];
  files: FileType[];
  data?: TData;
  alertError?: boolean;
};

export type RequestResponseType<TData = any> = {
  data: TData;
  meta?: any;
};

export type ResponseType<T = any> = {
  error?: any;
  data?: RequestResponseType<T> | null;
};

export type RequestFilterType = Record<string, string | string[]>;

export type RequestSortedType = Record<string, 'asc' | 'desc'>;

export type RequestPaginationType = {
  page?: number;
  pageSize?: number;
};

export type RequestGetMetaType<
  TFilter = RequestFilterType,
  TSorted = RequestSortedType,
  TPagination = RequestPaginationType,
> = TPagination & Partial<TFilter> & Partial<TSorted>;
