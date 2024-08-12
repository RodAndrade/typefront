import { CookiesConstants } from '@constants/cookies';

import {
  APIRequest,
  APIResponse,
  APIHandler,
  APIHandlerCallback,
  HandlerOptions,
} from './types';

import { AuthProvider } from '@providers/auth';
import { errorHandler } from '@lib/exceptions';

export class APIProvider {
  /**
   * Handle with authentication cookie, use only on API routes
   * @param handler API Handler callback, function with request with session and response
   * @param auth (boolean) Set true to check authentication on api
   */
  static handler(
    handler: APIHandlerCallback,
    auth: boolean | HandlerOptions = false,
  ): APIHandler {
    return async (req: APIRequest, res: APIResponse) => {
      const options =
        typeof auth === 'object'
          ? auth
          : {
              auth,
            };

      if (options?.method) {
        const requestMethod = Array.isArray(options.method)
          ? options.method
          : [options.method];

        if (!requestMethod.includes(req?.method as any)) {
          return res.status(405).json({
            data: 'Method not allowed',
          });
        }
      }

      const jwt = req.cookies?.[CookiesConstants.ACCESS_TOKEN] ?? '';
      const authData = AuthProvider.decrypt(jwt);

      if (options && options?.auth) {
        if (!authData.isAuth) {
          return res.status(403).json({
            data: 'Access denied',
          });
        }
      }

      req.session = authData.session;

      return handler(req, res).catch((err) => {
        return errorHandler(req, res, err);
      });
    };
  }

  static withAuthentication(
    handler: APIHandlerCallback,
    options?: HandlerOptions,
  ): APIHandler {
    return this.handler(handler, {
      ...options,
      auth: true,
    });
  }
}
