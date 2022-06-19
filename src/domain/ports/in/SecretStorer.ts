import UrlID from '../../models/UrlID';
import Secret from '../../models/Secret';

export default interface SecretStorer {
  storeSecret(secret: Secret): Promise<UrlID>
}