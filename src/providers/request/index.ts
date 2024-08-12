'use client';

import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import FormData from 'form-data';
import qs from 'qs';
import Cookies from 'js-cookie';

import LogProvider from '@providers/log';

import { RoutesConstants } from '@constants/routes';

import { FileType, RequestOptionsType, ResponseType } from './types';
import { toast } from '@components/ui/use-toast';
import { captalize } from '@utils/string';
import { CookiesConstants } from '@constants/cookies';
import { LogsConstants } from '@constants/log';

export class RequestProvider {
  private static apiBaseUrl: string = RoutesConstants.API;
  private static log: LogProvider = new LogProvider('request', {
    enabled: LogsConstants.API,
  });

  private static expiredStatusCode: number[] = [401];

  private static createOptions(
    options?: Partial<RequestOptionsType>,
  ): AxiosRequestConfig {
    const headers: RequestOptionsType['headers'] = {
      'Content-Type': 'application/json',
      ...(options?.headers ?? {}),
    };

    if (options?.accessToken) {
      headers.Authorization = `Bearer ${options.accessToken}`;
    }

    return {
      baseURL: this.apiBaseUrl,
      method: options?.method ?? 'GET',
      data: options?.data,
      headers,
      params: options?.params,
    };
  }

  private static createFormData(files: FileType | FileType[]): FormData {
    const formData = new FormData();
    if (Array.isArray(files)) {
      files.forEach((file) =>
        formData.append(file.param, file.file, file?.name),
      );
    } else {
      formData.append(files.param, files.file, files?.name);
    }

    return formData;
  }

  private static handleErrors(messages: Record<string, string[]>): string {
    const message = Object.keys(messages)
      .map((prop) => `${captalize(prop)}: ${messages[prop].join(', ')}`)
      .join('\n');

    return message;
  }

  private static makeRequest<T = any>(
    path: string,
    options?: Omit<Partial<RequestOptionsType>, 'files'>,
  ): Promise<ResponseType<T>> {
    return new Promise((res) => {
      const requestOptions = this.createOptions(options);
      const alertError = options?.alertError ?? true;

      axios({
        ...requestOptions,
        url: path,
        paramsSerializer: (params) => {
          return options?.params ? qs.stringify(params) : '';
        },
      })
        .then((response) => {
          this.log.debug('success', {
            request: {
              ...requestOptions,
              path,
            },
            response: response ?? {},
          });

          res({
            error: null,
            data: response?.data,
          });
        })
        .catch((reason: AxiosError) => {
          this.log.error(
            'error',
            {
              request: requestOptions,
              reason: reason?.response?.data || reason,
            },
            true,
          );

          const isSessionExpired = this.expiredStatusCode.includes(
            reason?.response?.status ?? 500,
          );
          if (isSessionExpired && options?.auth === true) {
            window.location.href = RoutesConstants.SIGN_IN;
            // TODO: redirect para o login
          }

          const body = reason?.response?.data ?? ({} as any);
          const errorText =
            body?.message ??
            reason?.cause?.message ??
            'An error occurred. Please try again.';
          const errorMessages = body?.errors ?? undefined;
          const hasMessages = !!errorMessages;

          alertError &&
            toast({
              title: hasMessages ? errorText : 'Ops!',
              description: hasMessages
                ? this.handleErrors(errorMessages)
                : errorText,
            });

          res({
            error: errorText,
            data: null,
          });
        });
    });
  }

  private static getAccessToken(): string | null {
    return Cookies.get(CookiesConstants.ACCESS_TOKEN) || null;
  }

  static request<T = any>(
    path: string,
    options?: Partial<Omit<RequestOptionsType, 'files'>>,
  ): Promise<ResponseType<T>> {
    return this.makeRequest<T>(path, options);
  }

  static requestWithFiles<T = any>(
    path: string,
    files: FileType | FileType[],
    options?: Omit<RequestOptionsType, 'accessToken' | 'data' | 'files'>,
  ): Promise<ResponseType<T>> {
    const formData = this.createFormData(files);

    return this.makeRequest<T>(path, {
      ...options,
      headers: {
        ...options?.headers,
        ...formData.getHeaders(),
      },
      data: formData,
    });
  }

  static withAuth<T = any>(
    path: string,
    options?: Omit<RequestOptionsType, 'files'>,
  ): Promise<ResponseType<T>> {
    return this.makeRequest<T>(path, {
      ...options,
      accessToken: this.getAccessToken() || options?.accessToken,
      auth: true,
    });
  }

  static filesWithAuth<T = any>(
    path: string,
    files: FileType | FileType[],
    options?: Omit<RequestOptionsType, 'data' | 'files'>,
  ): Promise<ResponseType<T>> {
    const formData = this.createFormData(files);

    return this.makeRequest<T>(path, {
      ...options,
      data: formData,
      headers: {
        ...formData.getHeaders(),
      },
      accessToken: this.getAccessToken() || options?.accessToken,
      auth: true,
    });
  }
}
