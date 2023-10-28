import { FastifyRequest, FastifyReply } from 'fastify';

import { z as zod } from 'zod';

import { File } from 'fastify-multer/lib/interfaces';

import { OngNotExistsError } from '@modules/pets/use-cases/errors/OngNotExistsError';

import { makeCreatePetUseCase } from '@modules/pets/use-cases/factories/MakeCreatePetUseCase';

declare module 'fastify' {
  export interface FastifyRequest {
    files: File[];
  }
}

interface Filename {
  filename: string;
  filepath?: string;
  type?: string;
  tasks?: null;
  id?: string;
}

async function createPet(request: FastifyRequest, reply: FastifyReply) {
  const createPetBodySchema = zod.object({
    name: zod.string(),
    age: zod.string(),
    description: zod.string(),
    energy_level: zod.coerce.number(),
    size: zod.string(),
    observations: zod.array(zod.string()),
  });

  const { name, age, description, energy_level, size, observations } =
    createPetBodySchema.parse(request.body);

  const ongId = request.user.sub;

  try {
    const createPetUseCase = makeCreatePetUseCase();

    const imagesPet: Filename[] = request.files.map((file) => ({
      filename: file.filename ?? '',
    }));

    const pet = await createPetUseCase.execute({
      name,
      age,
      description,
      energy_level,
      size,
      observations,
      ong_id: ongId,
      images: imagesPet,
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
