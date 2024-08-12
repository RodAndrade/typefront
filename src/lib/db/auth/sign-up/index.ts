import { BadRequestException } from '@lib/exceptions/BadRequestException';
import { authSignUpSchema } from './schemas';

import { IAuthSignUpService } from './types';
import { db } from '@lib/db';
import { t } from 'i18next';
import { hash } from '@utils/hash';
import { isSupport } from '../../users/utils';

export default class AuthSignUpService {
  constructor(private readonly body: IAuthSignUpService.Body) {
    this.body = authSignUpSchema().parse(body);
  }

  private async validateDuplicatedEmail() {
    const results = await db.user.count({
      where: {
        email: this.body.email,
        active: true,
      },
    });

    if (results > 0)
      throw new BadRequestException(t('errors.generic.duplicated_email'));
  }

  private async createUser() {
    const user = await db.user.create({
      data: {
        name: this.body.name,
        email: this.body.email,
        password: hash(this.body.password),
        isSupport: isSupport(this.body.email),
        status: 'PENDING',
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return user;
  }

  public async execute() {
    await this.validateDuplicatedEmail();

    return await this.createUser();
  }
}
