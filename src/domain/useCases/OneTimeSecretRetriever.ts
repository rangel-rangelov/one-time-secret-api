import Secret from '../models/Secret';
import UrlID from '../models/UrlID';
import SecretRepository from '../ports/out/SecretRepository';
import SecretRetriever from '../ports/in/SecretRetriever';

export default class OneTimeSecretRetriever implements SecretRetriever {
  constructor(private secretRepository: SecretRepository) {
    
  }

  async retrieveSecret(urlId: UrlID): Promise<Secret> {
    const secret = await this.secretRepository.getSecretByUrlID(urlId);
    await this.secretRepository.removeSecretByUrlID(urlId);

    return secret;
  }
}