import { Request, Response, NextFunction } from 'express';

import ValidationError from '../ValidationError';
import SecretRetriever from '../../../domain/ports/in/SecretRetriever';
import UrlID from '../../../domain/models/UrlID';

export default class SecretsByIdController {
  constructor(private secretRetriever: SecretRetriever) {

  }

  retrieveSecretByUrl = async (req: Request, res: Response, next: NextFunction) => {
    try {
      this.validateRequest(req);
      const urlId = new UrlID(req.params.urlId);
      const secret = await this.secretRetriever.retrieveSecret(urlId);

      res.status(200).json(secret);
    } catch (error) {
      next(error);
    }
  };

  private validateRequest(req: Request) {
    if (!req.params?.urlId) throw new ValidationError('URL is not valid');
  }
}