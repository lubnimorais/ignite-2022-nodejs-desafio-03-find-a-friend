import { FastifyInstance } from 'fastify';

import { createUser } from '../controllers/CreateUserController';
import { authenticateUser } from '../controllers/AuthenticateUserController';
import { refreshTokenUser } from '../controllers/RefreshTokenUserController';

async function userRoutes(app: FastifyInstance) {
  app.post('/', createUser);

  // AUTH
  app.post('/sessions', authenticateUser);
  app.patch('/token/refresh', refreshTokenUser);
}

export { userRoutes };
