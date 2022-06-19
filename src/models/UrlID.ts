import URLIdTooShortError from './errors/UrlIDTooShortError';
export default class UrlID {
  constructor(private urlId: string) {
    if (urlId.length < 10) throw new URLIdTooShortError();
  }
}
