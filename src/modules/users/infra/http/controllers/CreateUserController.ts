import { FastifyRequest, FastifyReply } from 'fastify';

import { z as zod } from 'zod';

import { UserAlreadyExistsError } from '@modules/users/use-cases/errors/UserAlreadyExistsError';

import { makeCreateUserUseCase } from '@modules/users/use-cases/factories/MakeCreateUserUseCase';

async function createUser(request: FastifyRequest, reply: FastifyReply) {
  const createUseBodySchema = zod.object({
    name: zod.string(),
    email: zod.string().email(),
    password: zod.string().min(6),
  });

  const { name, email, password } = createUseBodySchema.parse(request.body);

  try {
    const createUserUseCase = makeCreateUserUseCase();

    const { user } = await createUserUseCase.execute({ name, email, password });

    return reply.status(201).send({ user });
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({
        message: err.message,
      });
    }

    throw err;
  }
}

export { createUser };
