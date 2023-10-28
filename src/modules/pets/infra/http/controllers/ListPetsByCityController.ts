import { FastifyRequest, FastifyReply } from 'fastify';

import { z as zod } from 'zod';

import { makeListPetsByCityUseCase } from '@modules/pets/use-cases/factories/MakeListPetsByCityUseCase';

async function listPetsByCity(request: FastifyRequest, reply: FastifyReply) {
  const listPetsByCityQuerySchema = zod.object({
    city: zod.string(),
    page: zod.coerce.number().min(1).default(1),
  });

  const { city, page } = listPetsByCityQuerySchema.parse(request.query);

  try {
    const listPetsByCityUseCase = makeListPetsByCityUseCase();

    const pets = await listPetsByCityUseCase.execute({ city, page });

    return reply.status(200).send(pets);
  } catch (err) {
    throw new Error();
  }
}

export { listPetsByCity };
