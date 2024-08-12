import { NextApiRequest, NextApiResponse } from 'next';
import { ZodError } from 'zod';

import { env } from '@constants/env';
import { mapZodErrors } from '@utils/map-zod-errors';

import { ApplicationException } from './ApplicationException';
import { BadRequestException } from './BadRequestException';
import { NotFoundException } from './NotFoundException';
import { UnauthorizedException } from './UnauthorizedException';
import { UpgradeRequiredException } from './UpgradeRequiredException';
import { t } from 'i18next';

export function errorHandler(
  req: NextApiRequest,
  res: NextApiResponse,
  err: Error,
) {
  if (err instanceof ApplicationException) {
    if (err instanceof NotFoundException)
      return res.status(404).json({ message: err.message });

    if (err instanceof BadRequestException)
      return res.status(400).json({ message: err.message });

    if (err instanceof UnauthorizedException)
      return res.status(401).json({ message: err.message });

    if (err instanceof UpgradeRequiredException)
      return res.status(426).json({ message: err.message });

    return res
      .status(500)
      .json({ message: t('errors.generic.unexpected_error') });
  }

  if (err instanceof ZodError) {
    return res.status(400).json({
      message: t('errors.generic.invalid_fields'),
      errors: mapZodErrors(err),
    });
  }

  return res
    .status(500)
    .json({ message: t('errors.generic.internal_server_error') });
}
