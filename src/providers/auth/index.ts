import { JwtType } from './types';

export class AuthProvider {
  public static decrypt = (jwt: string | null) => {
    const parsedJWT = this.parse(jwt);

    return {
      isAuth: this.isAuth(parsedJWT),
      session: parsedJWT,
    };
  };

  private static parse = (jwt: string | null): JwtType | null => {
    if (!jwt) return null;

    const getDate = (smallTime: number): Date => {
      const date = new Date();
      date.setTime(smallTime * 1000);
      return date;
    };

    try {
      const jwtStr = Buffer.from(jwt.split('.')[1], 'base64').toString();
      if (!jwtStr) return null;

      const _jwt = JSON.parse(jwtStr);
      if (!_jwt?.id || !_jwt?.exp || !_jwt?.iat) {
        return null;
      }

      return {
        ..._jwt,
        exp: getDate(_jwt.exp),
        iat: getDate(_jwt.iat),
      };
    } catch (error) {
      return null;
    }
  };

  private static isAuth(jwt: JwtType | null): boolean {
    const today = new Date();

    return !!jwt && today < jwt.exp;
  }
}
