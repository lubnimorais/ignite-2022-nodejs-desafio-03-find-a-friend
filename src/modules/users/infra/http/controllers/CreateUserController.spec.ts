import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import request from 'supertest';

import { app } from '@shared/infra/http/app';

describe('Register (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to create a user', async () => {
    const response = await request(app.server).post('/orgs').send({
      name: 'Org Test',
      email: 'orgtest@example.com',
      password: '123456',
    });

    expect(response.statusCode).toEqual(201);
  });
});
