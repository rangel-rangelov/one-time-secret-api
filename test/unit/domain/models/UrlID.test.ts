import UrlID from '../../../../src/domain/models/UrlID';
import URLIdTooShortError from '../../../../src/domain/models/errors/UrlIDTooShortError';

describe('UrlID Model', () => {
  it('should create an instance of UrlId class', () => {
    expect(new UrlID('asdqwe1234')).toBeInstanceOf(UrlID);
  });

  it('should throw an error if the UrlID has length less than 10', () => {
    expect(() => new UrlID('12')).toThrow(URLIdTooShortError);
  });

  it('should return a string representation on the toString method', () => {
    expect(new UrlID('asdqwe1234').toString()).toBe('asdqwe1234');
  });
});
