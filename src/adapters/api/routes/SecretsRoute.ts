import { Application } from 'express';

import Route from './Route';
import SecretsController from '../controllers/SecretsController';

export default class SecretsRoute implements Route {
  constructor(private secretsController: SecretsController) {}

  mountRoute(application: Application): void {
    application.route('/api/secrets')
      .post(this.secretsController.createSecret);
  }
}