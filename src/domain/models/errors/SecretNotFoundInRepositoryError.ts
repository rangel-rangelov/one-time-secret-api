export default class SecretNotFoundInRepositoryError extends Error {
  constructor() {
    super('Secret does not exist in repository!');
    this.name = 'SecretNotFoundInRepositoryError';
  }
}