
import { NextFunction, request, Request, response, Response  } from 'express';

import SecretsByIdController from '../../../../../src/adapters/api/controllers/SecretsByIdController';
import ValidationError from '../../../../../src/adapters/api/ValidationError';
import SecretNotFoundInRepositoryError from '../../../../../src/domain/models/errors/SecretNotFoundInRepositoryError';
import Secret from '../../../../../src/domain/models/Secret';
import SecretRetriever from '../../../../../src/domain/ports/in/SecretRetriever';

describe('Secrets by ID', () => {
  it('should throw error when sending invalid url', () => {
    const req: Request = expect.any(request);
    const res: Response = expect.any(response);
    const next: NextFunction = jest.fn();

    const secretRetriever: SecretRetriever = {
      retrieveSecret: jest.fn(),
    };

    const secretsByIdController = new SecretsByIdController(secretRetriever);
    secretsByIdController.retrieveSecretByUrl(req, res, next);

    expect(next).toBeCalledTimes(1);
    expect(next).toBeCalledWith(new ValidationError('URL is not valid'));
  });

  it('should throw error when secret is not found', async () => {
    const req: Request = expect.any(request);
    req.params = { urlId: 'asdqwe1234' };
    const res: Response = expect.any(response);
    const next: NextFunction = jest.fn();

    const secretRetriever: SecretRetriever = {
      retrieveSecret: jest.fn().mockImplementation(() => {
        throw new SecretNotFoundInRepositoryError();
      }),
    };

    const secretsByIdController = new SecretsByIdController(secretRetriever);
    await secretsByIdController.retrieveSecretByUrl(req, res, next);

    expect(next).toBeCalledTimes(1);
    expect(next).toBeCalledWith(new SecretNotFoundInRepositoryError());
  });

  it('should return secret', async () => {
    const req: Request = expect.any(request);
    req.params = { urlId: 'asdqwe1234' };
    const res: Response = expect.any(response);
    res.status = jest.fn().mockReturnThis();
    res.json = jest.fn();
    const next: NextFunction = jest.fn();

    const secretRetriever: SecretRetriever = {
      retrieveSecret: jest.fn().mockResolvedValue(new Secret('123')),
    };

    const secretsByIdController = new SecretsByIdController(secretRetriever);
    await secretsByIdController.retrieveSecretByUrl(req, res, next);

    expect(next).toBeCalledTimes(0);
    expect(res.status).toBeCalledTimes(1);
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledTimes(1);
    expect(res.json).toBeCalledWith({ secret: '123' });
  });
});