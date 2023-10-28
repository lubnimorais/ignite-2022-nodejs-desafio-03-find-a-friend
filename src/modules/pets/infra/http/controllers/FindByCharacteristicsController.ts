import { FastifyReply, FastifyRequest } from 'fastify';

import { z as zod } from 'zod';

import { makeFindByCharacteristicsUseCase } from '@modules/pets/use-cases/factories/MakeFindByCharacteristicsUseCase';

export const findByCharacteristics = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const searchPetsQuerySchema = zod.object({
    age: zod.string(),
    energy: zod.coerce.number(),
    independence: zod.string(),
    size: zod.string(),
    city: zod.string(),
  });

  const { age, energy, independence, size, city } = searchPetsQuerySchema.parse(
    request.query,
  );

  const findByCharacteristicsUseCase = makeFindByCharacteristicsUseCase();

  const pets = await findByCharacteristicsUseCase.execute({
    age,
    energy,
    independence,
    size,
    city,
  });

  return reply.status(200).send(pets);
};
