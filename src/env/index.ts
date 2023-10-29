import { config } from 'dotenv';

import { z as zod } from 'zod';

if (process.env.NODE_ENV === 'test') {
  config({ path: '.env.test' });
} else {
  config();
}

const envSchema = zod.object({
  PORT: zod.coerce.number().default(3333),
  NODE_ENV: zod.enum(['dev', 'production', 'test']).default('production'),
  JWT_SECRET: zod.string(),
  EXPIRES_IN: zod.string(),
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  console.error('❌ Invalid environment variables!', _env.error.format());

  throw new Error('Invalid environment variables!');
}

const env = _env.data;

export { env };
