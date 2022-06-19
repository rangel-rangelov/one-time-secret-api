import UrlID from '../../src/models/UrlID';
import URLIdTooShortError from '../../src/models/errors/UrlIDTooShortError';

describe('UrlID Test', () => {
  it('should create an instance of UrlId class', () => {
    expect(new UrlID('asdqwe1234')).toBeInstanceOf(UrlID);
  });

  it('should throw an error if the UrlID has length less than 10', () => {
    expect(() => new UrlID('12')).toThrow(URLIdTooShortError);
  });
});
