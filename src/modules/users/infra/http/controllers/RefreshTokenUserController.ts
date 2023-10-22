import { FastifyRequest, FastifyReply } from 'fastify';

async function refreshTokenUser(request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify();

  const user = request.user;

  const token = await reply.jwtSign(
    {},
    {
      sign: {
        sub: user.sub,
      },
    },
  );

  const refreshToken = await reply.jwtSign(
    {},
    {
      sign: {
        sub: user.sub,
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

export { refreshTokenUser };
