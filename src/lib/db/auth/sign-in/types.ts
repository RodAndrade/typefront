export namespace IAuthSignInService {
  export type Body = {
    email: string;
    password: string;
  };

  export type UserJWT = {
    id: number;
    name: string;
    isSupport: boolean;
  };
}
