import { FastifyRequest, FastifyReply } from 'fastify';

import { z as zod } from 'zod';

import authConfig from '@config/auth';

import { InvalidCredentialsError } from '@modules/users/use-cases/errors/InvalidCredentialsError';

import { makeAuthenticateUserUseCase } from '@modules/users/use-cases/factories/MakeAuthenticateUserUseCase';

async function authenticateUser(request: FastifyRequest, reply: FastifyReply) {
  const authenticateUserBodySchema = zod.object({
    email: zod.string().email(),
    password: zod.string().min(6),
  });

  const { email, password } = authenticateUserBodySchema.parse(request.body);

  try {
    const authenticateUserUseCase = makeAuthenticateUserUseCase();

    const { user } = await authenticateUserUseCase.execute({ email, password });

    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: user.id,
        },
      },
    );

    const refreshToken = await reply.jwtSign(
      {},
      {
        sign: {
          sub: user.id,
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
      return reply.status(401).send({
        message: err.message,
      });
    }

    throw err;
  }
}

export { authenticateUser };
