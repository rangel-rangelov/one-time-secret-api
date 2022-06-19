import UrlID from '../../models/UrlID';
import Secret from '../../models/Secret';

export default interface SecretRetriever {
  retrieveSecret(urlId: UrlID): Promise<Secret>;
}