export type RouteType = string | RegExp;

export class RoutesConstants {
  static readonly APP: string =
    process?.env?.NEXT_PUBLIC_APP_URL ?? 'https://app.rcandrade.com.br';

  static readonly API: string =
    process?.env?.NEXT_PUBLIC_API_URL ?? 'https://app.rcandrade.com.br';

  // Public
  static readonly SIGN_IN: string = '/sign-in';
  static readonly SIGN_IN_FORGOT_PASSWORD: string = '/sign-in/forgot-password';

  static readonly SIGN_UP: string = '/sign-up';
  static readonly SIGN_UP_EMAIL_CONFIRMATION: string = '/sign-up/confirm-email';

  static readonly NOT_FOUND: string = '/404';

  // Private
  static readonly HOME: string = '/app';
  static readonly SETTINGS: string = '/app/settings';
  static readonly SETTINGS_PROFILE: string = '/app/settings';
  static readonly SETTINGS_USERS: string = '/app/settings/users';
  static readonly SETTINGS_THEME: string = '/app/settings/theme';

  static readonly PUBLIC_ROUTES: RouteType[] = [this.SIGN_IN, this.SIGN_UP];

  static isPublicRoute(path: string): boolean {
    return this.includeRoute(path, this.PUBLIC_ROUTES);
  }

  static isPrivateRoute(path: string): boolean {
    return path.startsWith('/app');
  }

  static compareRoute(path: string, route: RouteType) {
    const _path = path.toLowerCase();

    return typeof route === 'string'
      ? route.toLowerCase() === _path
      : route.test(_path);
  }

  static includeRoute(
    path: string,
    routes: RouteType[],
    arrayCompare: 'every' | 'some' = 'some',
  ) {
    if (arrayCompare === 'some') {
      return routes.some((route) => this.compareRoute(path, route));
    }

    return routes.every((route) => this.compareRoute(path, route));
  }
}

export function getRoute(
  path: string,
  replaces?: Array<string | number>,
  baseUrl: string = RoutesConstants.APP,
) {
  if (!replaces) {
    return `${baseUrl}${path}`;
  }

  replaces.forEach((value, i) => {
    path.replace(`{${i}}`, String(value));
  });

  return `${baseUrl}${path}`;
}
