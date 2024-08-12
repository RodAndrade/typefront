import jwt from 'jsonwebtoken';

import { db } from '@lib/db';

import { IUser } from './types';
import { env } from '@constants/env';
import { UnauthorizedException } from '@lib/exceptions/UnauthorizedException';
import { BadRequestException } from '@lib/exceptions/BadRequestException';

export default class UsersServices {
  static async get(
    id: number,
    isSupport: boolean = false,
  ): Promise<IUser.Get | null> {
    const user = await db.user.findUnique({
      where: {
        id: id,
        active: true,
      },
      select: {
        id: true,
        name: true,
        email: true,
        status: true,
        isSupport: true,
        updatedAt: true,
        createdAt: true,
        password: false,
      },
    });

    return user || null;
  }

  static async session(accessToken: string): Promise<IUser.Session | null> {
    const user = jwt.verify(accessToken, env.JWT_SECRET) as IUser.Session;

    return user?.id ? user : null;
  }

  static async getByEmail(email: string, isSupport: boolean = false) {
    return db.user.findUnique({
      where: {
        email,
        isSupport: isSupport ? undefined : false,
        active: true,
      },
      select: {
        id: true,
        name: true,
        email: true,
        status: true,
        isSupport: true,
        updatedAt: true,
        createdAt: true,
        password: false,
      },
    });
  }

  static async getAll(isSupport: boolean = false) {
    return db.user.findMany({
      where: {
        isSupport: isSupport ? undefined : false,
        active: true,
      },
      select: {
        id: true,
        name: true,
        email: true,
        status: true,
        isSupport: true,
        updatedAt: true,
        createdAt: true,
        password: false,
      },
      orderBy: {
        id: 'asc',
      },
    });
  }

  static async changeUserStatus(
    id: number,
    status: IUser.Get['status'],
    isSupport: boolean = false,
  ): Promise<IUser.Get | null> {
    if (status === 'PENDING') {
      throw new BadRequestException(
        'Não é possível definir um usuário como pendente',
      );
    }

    const updatedUser = await db.user.findUnique({
      select: {
        isSupport: true,
      },
      where: {
        id,
        active: true,
      },
    });

    if (updatedUser?.isSupport && !isSupport) {
      throw new UnauthorizedException('Não autorizado');
    }

    const user = await db.user.update({
      where: {
        id,
      },
      data: {
        status: status,
      },
    });

    return user || null;
  }

  static async delete(id: IUser.Base['id'], isSupport: boolean = false) {
    const user = await db.user.findUnique({
      select: {
        isSupport: true,
      },
      where: {
        id,
        active: true,
      },
    });

    if (user?.isSupport && !isSupport) {
      throw new UnauthorizedException('Não autorizado');
    }

    const deleted = await db.user.update({
      where: {
        id,
      },
      data: {
        active: false,
      },
    });

    if (!deleted) {
      throw new BadRequestException('Erro ao deletar usuário');
    }

    return deleted;
  }
}
