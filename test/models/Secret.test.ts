import Secret from '../../src/models/Secret';
import SecretTooShortError from '../../src/models/errors/SecretTooShortError';

describe('Secret Test', () => {
  it('should create an instance of Secret class', () => {
    expect(new Secret('123qwe')).toBeInstanceOf(Secret);
  });

  it('should throw an error if the secret has length less than 3', () => {
    expect(() => new Secret('12')).toThrow(SecretTooShortError);
  });
});
