import { t } from 'i18next';
import { z } from 'zod';

export const authSignUpSchema = () =>
  z
    .object({
      name: z
        .string({ required_error: t('errors.generic.required') })
        .trim()
        .min(1, t('errors.generic.required')),
      email: z
        .string({ required_error: t('errors.generic.required') })
        .trim()
        .toLowerCase()
        .email(t('errors.specifc.invalid_email')),
      password: z
        .string({ required_error: t('errors.generic.required') })
        .min(8, t('errors.generic.too_short')),
      passwordConfirm: z
        .string({ required_error: t('errors.generic.required') })
        .min(8, t('errors.generic.too_short')),
    })
    .refine((data) => data.password === data.passwordConfirm, {
      message: t('errors.specifc.password_not_match'),
      path: ['confirm'],
    });
