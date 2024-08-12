import { createHmac } from 'node:crypto';

import { env } from '@constants/env';

export function hash(text: string) {
  return createHmac('sha256', env.HASH_SECRET ?? '')
    .update(text)
    .digest('hex');
}
