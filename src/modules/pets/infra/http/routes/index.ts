import { FastifyInstance } from 'fastify';

import { verifyJWT } from '@shared/infra/http/midllewares/verify-jwt';

import { createPet } from '../controllers/CreatePetController';

async function petRoutes(app: FastifyInstance) {
  app.post('/', { onRequest: [verifyJWT] }, createPet);
}

export { petRoutes };
