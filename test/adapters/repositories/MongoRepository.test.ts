import mongoose from 'mongoose';

import MongoRepository from '../../../src/adapters/repositories/MongoRepository';
import UrlID from '../../../src/domain/models/UrlID';
import Secret from '../../../src/domain/models/Secret';
import { SecretModel } from '../../../src/adapters/repositories/SecretModel';
import SecretNotFoundInRepositoryError from '../../../src/domain/models/errors/SecretNotFoundInRepositoryError';

describe('MongoRepository', () => {
  it('should connect to the database', () => {
    mongoose.connect = jest.fn();

    new MongoRepository(); 
    expect(mongoose.connect).toBeCalledTimes(1);
    expect(mongoose.connect).toBeCalledWith('mongodb://localhost:27017/onetimesecret');
  });

  it('should retrieve a secret from database', async () => {
    const mongoRepository = new MongoRepository();
    SecretModel.findOne = jest.fn().mockResolvedValue({ secret: '123' });
    const urlId = new UrlID('asdqwe1234');

    expect(await mongoRepository.getSecretByUrlID(urlId)).toEqual(new Secret('123'));
    expect(SecretModel.findOne).toBeCalledTimes(1);
    expect(SecretModel.findOne).toBeCalledWith({ urlId: urlId.toString() });
  });

  it('should throw error when secret does not exist', async () => {
    const mongoRepository = new MongoRepository();
    SecretModel.findOne = jest.fn().mockResolvedValue(null);
    const urlId = new UrlID('asdqwe1234');

    expect(mongoRepository.getSecretByUrlID(urlId)).rejects.toThrow(SecretNotFoundInRepositoryError);
    expect(SecretModel.findOne).toBeCalledTimes(1);
    expect(SecretModel.findOne).toBeCalledWith({ urlId: urlId.toString() });
  });

  it('should remove secret from database', async () => {
    const mongoRepository = new MongoRepository();
    SecretModel.deleteOne = jest.fn();
    const urlId = new UrlID('asdqwe1234');

    await mongoRepository.removeSecretByUrlID(urlId);

    expect(SecretModel.deleteOne).toBeCalledTimes(1);
    expect(SecretModel.deleteOne).toBeCalledWith({ urlId: urlId.toString() });
  });

  it('should create urlId secret in database', async () => {
    const mongoRepository = new MongoRepository();
    SecretModel.create = jest.fn();
    const urlId = new UrlID('asdqwe1234');
    const secret = new Secret('123');

    await mongoRepository.storeUrlIdAndSecret(urlId, secret);

    expect(SecretModel.create).toBeCalledTimes(1);
    expect(SecretModel.create).toBeCalledWith({ urlId: urlId.toString(), secret: secret.toString() });
  });
});
