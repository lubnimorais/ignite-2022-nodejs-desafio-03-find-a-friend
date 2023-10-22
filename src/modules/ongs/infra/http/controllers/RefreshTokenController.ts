import { FastifyRequest, FastifyReply } from 'fastify';

import authConfig from '@config/auth';

async function refreshToken(request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify();

  const token = await reply.jwtSign(
    {},
    {
      sign: {
        sub: request.user.sub,
      },
    },
  );

  const refreshToken = await reply.jwtSign(
    {},
    {
      sign: {
        sub: request.user.sub,
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
}

export { refreshToken };
