export namespace IAuthSignUpService {
  export type Body = {
    name: string;
    email: string;
    password: string;
    passwordConfirm: string;
  };
}
