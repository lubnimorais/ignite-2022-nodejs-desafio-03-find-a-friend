import { FastifyRequest, FastifyReply } from 'fastify';

import { z as zod } from 'zod';

import { PetNotExistsError } from '@modules/pets/use-cases/errors/PetNotExistsError';

import { makeShowPetUseCase } from '@modules/pets/use-cases/factories/MakeShowPetUseCase';

async function showPet(request: FastifyRequest, reply: FastifyReply) {
  const showPetParamsSchema = zod.object({
    id: zod.string(),
  });

  const { id } = showPetParamsSchema.parse(request.params);

  try {
    const showPetUseCase = makeShowPetUseCase();

    const pet = await showPetUseCase.execute({ id });

    return reply.status(200).send(pet);
  } catch (err) {
    if (err instanceof PetNotExistsError) {
      return reply.status(404).send({
        message: err.message,
      });
    }

    throw err;
  }
}

export { showPet };
