import { FastifyRequest, FastifyReply } from 'fastify';

import { z as zod } from 'zod';

import authConfig from '@config/auth';

import { InvalidCredentialsError } from '@modules/ongs/use-cases/errors/InvalidCredentialsError';

import { makeAuthenticateUseCase } from '@modules/ongs/use-cases/factories/MakeAuthenticateUseCase';

async function authenticate(request: FastifyRequest, reply: FastifyReply) {
  const authenticateBodySchema = zod.object({
    email: zod.string().email(),
    password: zod.string().min(6),
  });

  const { email, password } = authenticateBodySchema.parse(request.body);

  try {
    const authenticateUseCase = makeAuthenticateUseCase();

    const { ong } = await authenticateUseCase.execute({ email, password });

    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: ong.id,
        },
      },
    );

    const refreshToken = await reply.jwtSign(
      {},
      {
        sign: {
          sub: ong.id,
          expiresIn: authConfig.jwt.EXPIRES_IN,
        },
      },
    );

    return reply
      .setCookie('refreshToken', refreshToken, {
        path: '/',
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .status(200)
      .send({ token });
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(400).send({
        massage: err.message,
      });
    }

    throw err;
  }
}

export { authenticate };
