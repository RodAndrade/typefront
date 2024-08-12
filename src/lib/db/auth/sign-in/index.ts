import jwt from 'jsonwebtoken';

import { db } from '@lib/db';
import { hash } from '@utils/hash';
import { env } from '@constants/env';

import { UnauthorizedException } from '@lib/exceptions/UnauthorizedException';
import { BadRequestException } from '@lib/exceptions/BadRequestException';

import { authSignInSchema } from './schemas';
import { IAuthSignInService } from './types';
import { t } from 'i18next';

export default class AuthSignInService {
  private readonly USER_EXPIRATION_IN_SECONDS = 8 * 60 * 60; // 8 hours

  constructor(private readonly body: IAuthSignInService.Body) {
    this.body = authSignInSchema().parse(body);
  }

  private async user() {
    return db.user.findUnique({
      where: {
        email: this.body.email,
        password: hash(this.body.password),
        active: true,
      },
      select: {
        id: true,
        email: true,
        name: true,
        status: true,
        isSupport: true,
      },
    });
  }

  private generateJWT(user: IAuthSignInService.UserJWT): string {
    return jwt.sign(
      {
        id: user.id,
        name: user.name,
        email: this.body.email,
        isSupport: user?.isSupport ?? false,
      },
      env.JWT_SECRET,
      {
        expiresIn: this.USER_EXPIRATION_IN_SECONDS,
        algorithm: 'HS256',
      },
    );
  }

  async execute(): Promise<string> {
    const user = await this.user();

    if (!user)
      throw new UnauthorizedException(t('errors.specifc.invalid_credentials'));

    if (user.status !== 'ACCEPTED')
      throw new BadRequestException(t('errors.generic.confirm_your_account'));

    return this.generateJWT(user);
  }
}
