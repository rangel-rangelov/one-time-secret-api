import Secret from '../../models/Secret';
import UrlID from '../../models/UrlID';

export default interface SecretRepository {
  getSecretByUrlID(urlId: UrlID): Promise<Secret>;
  removeSecretByUrlID(urlId: UrlID): Promise<void>;
  storeUrlIdAndSecret(urlId: UrlID, secret: Secret): Promise<void>;
}