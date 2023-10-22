import { FastifyInstance } from 'fastify';

import { ongsRoutes } from '@modules/ongs/infra/http/routes';

async function appRoutes(app: FastifyInstance) {
  app.register(ongsRoutes, {
    prefix: '/ongs',
  });
}

export { appRoutes };
