import UrlID from '../../../../src/domain/models/UrlID';
import Secret from '../../../../src/domain/models/Secret';
import OneTimeSecretRetriever from '../../../../src/domain/useCases/OneTimeSecretRetriever';
import SecretRepository from '../../../../src/domain/ports/out/SecretRepository';

describe('OneTimeSecretRetriever', () => {
  it('should retrieve a secret one time', async () => {
    const secretRepository: SecretRepository = {
      getSecretByUrlID: jest.fn().mockResolvedValue(new Secret('123')),
      removeSecretByUrlID: jest.fn(),
      storeUrlIdAndSecret: jest.fn(),
    };
    const oneTimeSecretRetriever = new OneTimeSecretRetriever(secretRepository);
    const urlId = new UrlID('asdqwe1234');

    expect(await oneTimeSecretRetriever.retrieveSecret(urlId)).toEqual(new Secret('123'));
    expect(secretRepository.getSecretByUrlID).toBeCalledTimes(1);
    expect(secretRepository.getSecretByUrlID).toBeCalledWith(urlId);
    expect(secretRepository.removeSecretByUrlID).toBeCalledTimes(1);
    expect(secretRepository.removeSecretByUrlID).toBeCalledWith(urlId);
  });
});
