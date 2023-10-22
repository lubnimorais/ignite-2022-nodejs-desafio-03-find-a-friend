import { FastifyInstance } from 'fastify';

import { create } from '../controllers/CreateOngController';

async function ongsRoutes(app: FastifyInstance) {
  app.post('/', create);
}

export { ongsRoutes };
