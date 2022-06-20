import { Request, Response, NextFunction } from 'express';

import SecretStorer from '../../../domain/ports/in/SecretStorer';
import Secret from '../../../domain/models/Secret';
import ValidationError from '../ValidationError';

export default class SecretsController {
  constructor(private secretStorer: SecretStorer) {

  }

  createSecret = async (req: Request, res: Response, next: NextFunction) => {
    try {
      this.validateRequest(req);

      const secret = new Secret(req.body.secret);
      const urlId = await this.secretStorer.storeSecret(secret);

      res.status(201).json(urlId);
    } catch (error) {
      next(error);
    }
  };

  private validateRequest(req: Request) {
    if (!req.body?.secret || typeof req.body.secret !== 'string') throw new ValidationError('Request body not valid');
  }
}