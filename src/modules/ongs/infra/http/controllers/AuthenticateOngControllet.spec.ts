import request from 'supertest';

import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { app } from '@shared/infra/http/app';

describe('Authenticate (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to authenticate', async () => {
    await request(app.server).post('/ongs').send({
      name: 'Org Test',
      email: 'orgtest@example.com',
      password: '123456',
      whatsapp_number: '(99) 99999-9999',
      address: 'Address Test',
      postal_code: '99999-999',
      state: 'PE',
      city: 'Caruaru',
      latitude: -27.2092052,
      longitude: -49.6401091,
    });

    const response = await request(app.server).post('/ongs/sessions').send({
      email: 'orgtest@example.com',
      password: '123456',
    });

    expect(response.status).toEqual(200);
    expect(response.body).toEqual({
      token: expect.any(String),
    });
  });
});
