import uniqid from 'uniqid';

import TokenGenerator from '../../ports/out/TokenGenerator';

export default class UniqIdTokenGenerator implements TokenGenerator {
  generateToken(): string {
    return uniqid();
  }
}