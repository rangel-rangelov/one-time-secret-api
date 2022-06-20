import Secret from '../../../../src/domain/models/Secret';
import SecretTooShortError from '../../../../src/domain/models/errors/SecretTooShortError';

describe('Secret Model', () => {
  it('should create an instance of Secret class', () => {
    expect(new Secret('123qwe')).toBeInstanceOf(Secret);
  });

  it('should throw an error if the secret has length less than 3', () => {
    expect(() => new Secret('12')).toThrow(SecretTooShortError);
  });

  it('should return a string representation on the toString method', () => {
    expect(new Secret('123').toString()).toBe('123');
  });
});
