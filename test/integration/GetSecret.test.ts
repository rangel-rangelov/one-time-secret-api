import supertest from 'supertest';

import server from '../../src/server';
import { SecretModel } from '../../src/adapters/repositories/SecretModel';

const request = supertest(server.app);

describe('[INTEGRATION] Get Secret from API', () => {
  it('should retrieve a secret from db', async () => {
    SecretModel.findOne = jest.fn().mockResolvedValue({ secret: '123' });

    const res = await request.get('/api/secrets/asdqwe1234');

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ secret: '123' });
  });

  it('should receive an error if secret does not exist in db', async () => {
    SecretModel.findOne = jest.fn().mockResolvedValue(null);

    const res = await request.get('/api/secrets/asdqwe1234');

    expect(res.status).toBe(404);
    expect(res.body).toEqual({ name: 'SecretNotFoundInRepositoryError', message: 'Secret does not exist in repository!' });
  });
});
