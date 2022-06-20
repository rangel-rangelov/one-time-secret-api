import supertest from 'supertest';

import server from '../../src/server';
import { SecretModel } from '../../src/adapters/repositories/SecretModel';

const request = supertest(server.app);

describe('[INTEGRATION] Store Secret from API', () => {
  it('should store a secret in db', async () => {
    SecretModel.create = jest.fn();

    const res = await request.post('/api/secrets').send({ secret: '123' });

    expect(res.status).toBe(201);
    expect(res.body.urlId.length).toBeGreaterThanOrEqual(10);
  });

  it('should receive an error if the secret is smaller than 3 chars', async () => {
    SecretModel.create = jest.fn();

    const res = await request.post('/api/secrets').send({ secret: '23' });

    expect(res.status).toBe(400);
    expect(res.body).toEqual({ name: 'SecretTooShortError', message: 'Secret is too short!' });
  });
});
