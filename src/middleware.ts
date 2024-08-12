import { NextRequest, NextResponse } from 'next/server';
import { MiddlewareProvider } from '@providers/middleware';

export function middleware(req: NextRequest) {
  const redirectRoute = MiddlewareProvider.init(req);
  if (!!redirectRoute) {
    return NextResponse.redirect(redirectRoute, {
      url: redirectRoute,
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|images).*)'],
};
