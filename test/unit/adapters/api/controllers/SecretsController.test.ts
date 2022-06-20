
import { NextFunction, request, Request, response, Response  } from 'express';

import SecretsController from '../../../../../src/adapters/api/controllers/SecretsController';
import ValidationError from '../../../../../src/adapters/api/ValidationError';
import SecretStorer from '../../../../../src/domain/ports/in/SecretStorer';
import UrlID from '../../../../../src/domain/models/UrlID';


describe('Secrets by ID', () => {
  it('should throw error if body of request is empty', () => {
    const req: Request = expect.any(request);
    const res: Response = expect.any(response);
    const next: NextFunction = jest.fn();

    const secretStorer: SecretStorer = {
      storeSecret: jest.fn(),
    };

    const secretsController = new SecretsController(secretStorer);
    secretsController.createSecret(req, res, next);

    expect(next).toBeCalledTimes(1);
    expect(next).toBeCalledWith(new ValidationError('Request body not valid'));
  });

  it('should throw error if body does not have secret', () => {
    const req: Request = expect.any(request);
    req.body = { abc: 'abc' };
    const res: Response = expect.any(response);
    const next: NextFunction = jest.fn();

    const secretStorer: SecretStorer = {
      storeSecret: jest.fn(),
    };

    const secretsController = new SecretsController(secretStorer);
    secretsController.createSecret(req, res, next);

    expect(next).toBeCalledTimes(1);
    expect(next).toBeCalledWith(new ValidationError('Request body not valid'));
  });

  it('should throw error if secret is not a string', () => {
    const req: Request = expect.any(request);
    req.body = { abc: 'abc' };
    const res: Response = expect.any(response);
    const next: NextFunction = jest.fn();

    const secretStorer: SecretStorer = {
      storeSecret: jest.fn(),
    };

    const secretsController = new SecretsController(secretStorer);
    secretsController.createSecret(req, res, next);

    expect(next).toBeCalledTimes(1);
    expect(next).toBeCalledWith(new ValidationError('Request body not valid'));
  });

  it('should create a secret ', async () => {
    const req: Request = expect.any(request);
    req.body = { secret: '123' };
    const res: Response = expect.any(response);
    res.status = jest.fn().mockReturnThis();
    res.json = jest.fn();
    const next: NextFunction = jest.fn();

    const secretStorer: SecretStorer = {
      storeSecret: jest.fn().mockResolvedValue(new UrlID('asdqwe1234')),
    };

    const secretsController = new SecretsController(secretStorer);
    await secretsController.createSecret(req, res, next);

    expect(next).toBeCalledTimes(0);
    expect(res.status).toBeCalledTimes(1);
    expect(res.status).toBeCalledWith(201);
    expect(res.json).toBeCalledTimes(1);
    expect(res.json).toBeCalledWith({ urlId: 'asdqwe1234' });
  });
});