import { FastifyRequest, FastifyReply } from 'fastify';

import { z as zod } from 'zod';

import { OngNotExistsError } from '@modules/pets/use-cases/errors/OngNotExistesError';

import { makeCreatePetUseCase } from '@modules/pets/use-cases/factories/MakeCreatePetUseCase';

async function createPet(request: FastifyRequest, reply: FastifyReply) {
  const createPetBodySchema = zod.object({
    name: zod.string(),
    description: zod.string(),
    energy_level: zod.number(),
    size: zod.string(),
    city: zod.string(),
    observations: zod.array(zod.string()),
  });

  const { name, description, energy_level, size, city, observations } =
    createPetBodySchema.parse(request.body);

  const ongId = request.user.sub;

  try {
    const createPetUseCase = makeCreatePetUseCase();

    const pet = await createPetUseCase.execute({
      name,
      description,
      energy_level,
      size,
      city,
      observations,
      ong_id: ongId,
    });

    return reply.status(201).send(pet);
  } catch (err) {
    if (err instanceof OngNotExistsError) {
      return reply.status(409).send({
        message: err.message,
      });
    }

    throw err;
  }
}

export { createPet };
