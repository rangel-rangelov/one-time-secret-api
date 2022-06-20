import { Request, Response, NextFunction } from 'express';

import ValidationError from '../ValidationError';
import URLIdTooShortError from '../../../domain/models/errors/UrlIDTooShortError';
import SecretTooShortError from '../../../domain/models/errors/SecretTooShortError';
import SecretNotFoundInRepositoryError from '../../../domain/models/errors/SecretNotFoundInRepositoryError';

export default function errorHandler(
  error: Error,
  req: Request, 
  res: Response,
  next: NextFunction
) {
  if (error instanceof ValidationError
    || error instanceof URLIdTooShortError
    || error instanceof SecretTooShortError
  ) {
    res.status(400).json({
      name: error.name,
      message: error.message,
    });
  } else if (error instanceof SecretNotFoundInRepositoryError) {
    res.status(404).json({
      name: error.name,
      message: error.message,
    });
  } else {
    res.status(500).json({
      name: 'InternalServerError',
      message: 'Something went wrong!',
    });
  }
}
