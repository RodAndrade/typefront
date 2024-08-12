import { NextRequest } from 'next/server';

import { AuthProvider } from '@providers/auth';
import { CookiesConstants } from '@constants/cookies';
import { RoutesConstants, getRoute } from '@constants/routes';

export class MiddlewareProvider {
  static init(request: NextRequest): string | null {
    const pathname = request.nextUrl.pathname;
    const sessionCookie = request.cookies.get(CookiesConstants.ACCESS_TOKEN);
    const { isAuth } = AuthProvider.decrypt(sessionCookie?.value ?? '');

    if (this.isNextRoute(pathname)) {
      return null;
    }

    const isPublicRoute = RoutesConstants.isPublicRoute(pathname);
    if (!isPublicRoute && !isAuth) {
      const route = getRoute(RoutesConstants.SIGN_IN);

      return route;
    }

    if (isPublicRoute && isAuth) {
      const route = getRoute(RoutesConstants.HOME);

      return route;
    }

    return null;
  }

  private static isNextRoute(pathname: string): boolean {
    return (
      pathname.startsWith('/_next') || // exclude Next.js internals
      pathname.startsWith('/api') || //  exclude all API routes
      pathname.startsWith('/static') || // exclude static files
      pathname.startsWith('/images') // exclude static files
    );
  }
}
