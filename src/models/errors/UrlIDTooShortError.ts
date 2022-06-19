export default class URLIdTooShortError extends Error {
  constructor() {
    super('UrlID is too short!');
    this.name = 'UrlIDTooShortError';
  }
}