import SecretTooShortError from './errors/SecretTooShortError';

export default class Secret {
  constructor(private secret: string) {
    if (secret.length < 3) throw new SecretTooShortError();
  }
}
