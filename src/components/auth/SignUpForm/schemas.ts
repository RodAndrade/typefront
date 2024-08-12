import { z } from 'zod';

export const signUpSchema = z.object({
  name: z
    .string({ required_error: t('errors.generic.required') })
    .trim()
    .min(1, t('errors.generic.required'))
    .refine(
      (value) => /^\s*[\S]+(\s[\S]+)+\s*$/gm.test(value ?? ''),
      t('errors.generic.invalid-full-name'),
    ),
  email: z
    .string({ required_error: t('errors.generic.required') })
    .trim()
    .toLowerCase()
    .email(t('errors.specifc.invalid_email')),
  password: z
    .string({ required_error: t('errors.generic.required') })
    .min(8, t('errors.generic.too_short', 8)),
  passwordConfirm: z
    .string({ required_error: t('errors.generic.required') })
    .min(8, t('errors.generic.too_short', 8)),
});

function t(key: string, options?: any) {
  return key;
}
