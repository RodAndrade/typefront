import { User } from '@prisma/client';

import { IAuthSignUpService } from '@lib/db/auth/sign-up/types';

export namespace IUser {
  export type Base = User;

  export type Get = Omit<Partial<IUser.Base>, 'password'>;

  export type Session = Pick<
    Partial<IUser.Base>,
    'id' | 'name' | 'email' | 'isSupport'
  >;

  export type Create = IAuthSignUpService.Body;
}
