import { FastifyInstance } from 'fastify';

import { verifyJWT } from '@shared/infra/http/midllewares/verify-jwt';

import multar from 'fastify-multer';

import uploadConfig from '@config/upload';

import { createPet } from '../controllers/CreatePetController';
import { listPetsByCity } from '../controllers/ListPetsByCityController';
import { showPet } from '../controllers/ShowPetController';

async function petRoutes(app: FastifyInstance) {
  const upload = multar(uploadConfig.multer);

  app.post(
    '/',
    { onRequest: [verifyJWT], preHandler: upload.array('images') },
    createPet,
  );

  app.get('/show/:id', showPet);
  app.get('/city', listPetsByCity);
}

export { petRoutes };
