import UrlID from '../models/UrlID';
import Secret from '../models/Secret';
import SecretRepository from '../ports/out/SecretRepository';
import SecretStorer from '../ports/in/SecretStorer';
import TokenGenerator from '../ports/out/TokenGenerator';

export default class OneTimeSecretStorer implements SecretStorer {
  constructor(private secretRepository: SecretRepository, private tokenGenerator: TokenGenerator) {}

  async storeSecret(secret: Secret): Promise<UrlID> {
    const token = this.tokenGenerator.generateToken();
    const urlId = new UrlID(token);

    await this.secretRepository.storeUrlIdAndSecret(urlId, secret);

    return urlId;
  }
}