import { PrismaClient } from '@prisma/client';

import { env } from '../../../env';

const prismaClient = new PrismaClient({
  log: env.NODE_ENV === 'development' ? ['query'] : [],
});

export { prismaClient };
