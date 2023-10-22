import { FastifyInstance } from 'fastify';

import { create } from '../controllers/CreateOngController';
import { authenticate } from '../controllers/AuthenticateOngController';
import { refreshToken } from '../controllers/RefreshTokenController';

async function ongRoutes(app: FastifyInstance) {
  app.post('/', create);

  // AUTH
  app.post('/sessions', authenticate);
  app.patch('/token/refresh', refreshToken);
}

export { ongRoutes };
