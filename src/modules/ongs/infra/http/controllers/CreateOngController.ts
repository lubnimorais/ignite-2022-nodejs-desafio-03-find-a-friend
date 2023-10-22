import { FastifyReply, FastifyRequest } from 'fastify';

import { z as zod } from 'zod';

import { OngAlreadyExistsError } from '@modules/ongs/use-cases/errors/OngAlreadyExistsError';

import { makeCreateOngUseCase } from '@modules/ongs/use-cases/factories/MakeCreateOngUseCase';

async function create(request: FastifyRequest, reply: FastifyReply) {
  const createOngBodySchema = zod.object({
    name: zod.string(),
    email: zod.string(),
    password: zod.string().min(6),
    whatsapp_number: zod.string(),
    postal_code: zod.string(),
    address: zod.string(),
    latitude: zod.number(),
    longitude: zod.number(),
    state: zod.string(),
    city: zod.string(),
  });

  const {
    name,
    email,
    password,
    whatsapp_number,
    postal_code,
    address,
    latitude,
    longitude,
    state,
    city,
  } = createOngBodySchema.parse(request.body);

  let ong;

  try {
    const createOngUseCase = makeCreateOngUseCase();

    ong = await createOngUseCase.execute({
      name,
      email,
      password,
      whatsapp_number,
      postal_code,
      address,
      latitude,
      longitude,
      state,
      city,
    });
  } catch (err) {
    if (err instanceof OngAlreadyExistsError) {
      return reply.status(409).send({
        message: err.message,
      });
    }

    throw err;
  }

  return reply.status(201).send(ong);
}

export { create };
