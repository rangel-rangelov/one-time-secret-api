import UrlID from '../../../../src/domain/models/UrlID';
import Secret from '../../../../src/domain/models/Secret';
import OneTimeSecretStorer from '../../../../src/domain/useCases/OneTimeSecretStorer';
import SecretRepository from '../../../../src/domain/ports/out/SecretRepository';
import TokenGenerator from '../../../../src/domain/ports/out/TokenGenerator';

describe('OneTimeSecretStorer', () => {
  it('should store a secret and return a urlId to query after', async () => {
    const secretRepository: SecretRepository = {
      getSecretByUrlID: jest.fn(),
      removeSecretByUrlID: jest.fn(),
      storeUrlIdAndSecret: jest.fn(),
    };
    const tokenGenerator: TokenGenerator = {
      generateToken: jest.fn().mockReturnValue('asdqwe1234'),
    };
    const oneTimeSecretStorer = new OneTimeSecretStorer(secretRepository, tokenGenerator);
    const secret = new Secret('123');
    const urlId = new UrlID('asdqwe1234');

    expect(await oneTimeSecretStorer.storeSecret(secret)).toEqual(urlId);
    expect(secretRepository.storeUrlIdAndSecret).toBeCalledTimes(1);
    expect(secretRepository.storeUrlIdAndSecret).toBeCalledWith(urlId, secret);
    expect(tokenGenerator.generateToken).toBeCalledTimes(1);
  });
});
