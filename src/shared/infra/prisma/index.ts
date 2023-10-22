import { PrismaClient } from '@prisma/client';

import { env } from '@env/index';

const prismaClient = new PrismaClient({
  log: env.NODE_ENV === 'dev' ? ['query'] : [],
});

export { prismaClient };
