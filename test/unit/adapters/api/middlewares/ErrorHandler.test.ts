import { NextFunction, request, Request, response, Response  } from 'express';
import errorHandler from '../../../../../src/adapters/api/middlewares/ErrorHandler';
import ValidationError from '../../../../../src/adapters/api/ValidationError';
import URLIdTooShortError from '../../../../../src/domain/models/errors/UrlIDTooShortError';
import SecretTooShortError from '../../../../../src/domain/models/errors/SecretTooShortError';
import SecretNotFoundInRepositoryError from '../../../../../src/domain/models/errors/SecretNotFoundInRepositoryError';

describe('ErrorHandler', () => {
  it('should send an uncontrolled error', () => {
    const req: Request = expect.any(request);
    const res: Response = expect.any(response);
    res.status = jest.fn().mockReturnThis();
    res.json = jest.fn();
    const next: NextFunction = jest.fn();

    const error = new Error('Server is on fire');


    errorHandler(error, req, res, next);

    expect(res.status).toBeCalledTimes(1);
    expect(res.status).toBeCalledWith(500);
    expect(res.json).toBeCalledTimes(1);
    expect(res.json).toBeCalledWith({ name: 'InternalServerError', message: 'Something went wrong!' });
  }); 

  it('should send a validation error', () => {
    const req: Request = expect.any(request);
    const res: Response = expect.any(response);
    res.status = jest.fn().mockReturnThis();
    res.json = jest.fn();
    const next: NextFunction = jest.fn();

    const error = new ValidationError('Body is not valid');

    errorHandler(error, req, res, next);

    expect(res.status).toBeCalledTimes(1);
    expect(res.status).toBeCalledWith(400);
    expect(res.json).toBeCalledTimes(1);
    expect(res.json).toBeCalledWith({ name: 'ValidationError', message: 'Body is not valid' });
  });

  it('should send a UrlID too short error', () => {
    const req: Request = expect.any(request);
    const res: Response = expect.any(response);
    res.status = jest.fn().mockReturnThis();
    res.json = jest.fn();
    const next: NextFunction = jest.fn();

    const error = new URLIdTooShortError();

    errorHandler(error, req, res, next);

    expect(res.status).toBeCalledTimes(1);
    expect(res.status).toBeCalledWith(400);
    expect(res.json).toBeCalledTimes(1);
    expect(res.json).toBeCalledWith({ name: 'UrlIDTooShortError', message: 'UrlID is too short!' });
  }); 

  it('should send a Secret too short error', () => {
    const req: Request = expect.any(request);
    const res: Response = expect.any(response);
    res.status = jest.fn().mockReturnThis();
    res.json = jest.fn();
    const next: NextFunction = jest.fn();

    const error = new SecretTooShortError();

    errorHandler(error, req, res, next);

    expect(res.status).toBeCalledTimes(1);
    expect(res.status).toBeCalledWith(400);
    expect(res.json).toBeCalledTimes(1);
    expect(res.json).toBeCalledWith({ name: 'SecretTooShortError', message: 'Secret is too short!' });
  });

  it('should send a Secret not found error', () => {
    const req: Request = expect.any(request);
    const res: Response = expect.any(response);
    res.status = jest.fn().mockReturnThis();
    res.json = jest.fn();
    const next: NextFunction = jest.fn();

    const error = new SecretNotFoundInRepositoryError();

    errorHandler(error, req, res, next);

    expect(res.status).toBeCalledTimes(1);
    expect(res.status).toBeCalledWith(404);
    expect(res.json).toBeCalledTimes(1);
    expect(res.json).toBeCalledWith({ name: 'SecretNotFoundInRepositoryError', message: 'Secret does not exist in repository!' });
  }); 
});
