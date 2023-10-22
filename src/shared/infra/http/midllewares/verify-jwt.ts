import { FastifyRequest, FastifyReply } from 'fastify';

async function verifyJWT(request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify();
  } catch {
    return reply.status(401).send({ error: 'Unauthorized' });
  }
}

export { verifyJWT };
