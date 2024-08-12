import { NextApiRequest, NextApiResponse } from 'next';
import { JwtType } from '@providers/auth/types';

export interface APIRequest extends NextApiRequest {
  session?: JwtType | null;
}

export interface APIResponse extends NextApiResponse {}

type Promisify<T> = T | Promise<T>;
export type APIHandler = (req: APIRequest, res: APIResponse) => Promise<void>;
export type APIHandlerCallback = (
  req: APIRequest,
  res: APIResponse,
) => Promise<void>;

type APIMethodType = 'GET' | 'POST' | 'PUT' | 'DELETE';

export interface HandlerOptions {
  auth?: boolean;
  method?: APIMethodType | Array<APIMethodType>;
}
