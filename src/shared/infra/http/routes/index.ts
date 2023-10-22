import { FastifyInstance } from 'fastify';

import { ongRoutes } from '@modules/ongs/infra/http/routes';
import { userRoutes } from '@modules/users/infra/http/routes';
import { petRoutes } from '@modules/pets/infra/http/routes';

async function appRoutes(app: FastifyInstance) {
  app.register(ongRoutes, {
    prefix: '/ongs',
  });

  app.register(userRoutes, {
    prefix: '/users',
  });

  app.register(petRoutes, {
    prefix: '/pets',
  });
}

export { appRoutes };
