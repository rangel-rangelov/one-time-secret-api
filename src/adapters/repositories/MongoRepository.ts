import mongoose from 'mongoose';

import Secret from '../../domain/models/Secret';
import UrlID from '../../domain/models/UrlID';
import SecretRepository from '../../domain/ports/out/SecretRepository';
import { SecretModel } from './SecretModel';
import SecretNotFoundInRepositoryError from '../../domain/models/errors/SecretNotFoundInRepositoryError';

export default class MongoRepository implements SecretRepository {
  constructor() {
    this.setConnection();
  }
  
  async getSecretByUrlID(urlId: UrlID): Promise<Secret> {
    const doc = await SecretModel.findOne({ urlId: urlId.toString() });
    
    if (!doc) throw new SecretNotFoundInRepositoryError();

    return new Secret(doc.secret);
  }
  
  async removeSecretByUrlID(urlId: UrlID): Promise<void> {
    await SecretModel.deleteOne({ urlId: urlId.toString() });
  }
  
  async storeUrlIdAndSecret(urlId: UrlID, secret: Secret): Promise<void> {
    await SecretModel.create({ urlId: urlId.toString(), secret: secret.toString() })
  }

  private async setConnection() {
    if (mongoose.connection?.readyState === 0) {
      await mongoose.connect('mongodb://localhost:27017/onetimesecret');
    }
  }
}
