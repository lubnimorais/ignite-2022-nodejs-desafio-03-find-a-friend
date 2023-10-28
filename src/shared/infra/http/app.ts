import fastify from 'fastify';

import cookie from '@fastify/cookie';

import fastifyJwt from '@fastify/jwt';

import multer from 'fastify-multer';

import { ZodError } from 'zod';

import { env } from '../../../env';

import authConfig from '@config/auth';

import { appRoutes } from './routes';

const app = fastify();

app.register(fastifyJwt, {
  secret: authConfig.jwt.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
});

// COOKIES
app.register(cookie);

// MULTER
app.register(multer.contentParser);

// ROUTES
app.register(appRoutes);

app.setErrorHandler((error, request, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Validation error',
      issues: error.format(),
    });
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error);
  } else {
    // TODO - Here we should log to on external tool like Datadog/NewRelic/Sentry
    // ferramenta de observabilidade
  }

  return reply.status(500).send({
    message: 'Internal server error!',
  });
});

export { app };
