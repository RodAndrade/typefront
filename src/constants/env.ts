import { z } from 'zod';

const envSchema = () =>
  z.object({
    PORT: z.coerce.number().optional(),

    DATABASE_URL: z.string().url(),
    JWT_SECRET: z.string(),
    HASH_SECRET: z.string(),
  });

export const env = envSchema().parse(process.env);
