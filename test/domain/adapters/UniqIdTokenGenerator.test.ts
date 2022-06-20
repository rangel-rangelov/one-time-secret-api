import uniqid from 'uniqid';

import UniqIdTokenGenerator from '../../../src/domain/adapters/UniqIdTokenGenerator';

jest.mock('uniqid');
const mockUniqId = uniqid as jest.MockedFunction<typeof uniqid>;


describe('UniqIdTokenGenerator', () => {
  it('should generate a token longer than 10 chars', () => {
    mockUniqId.mockReturnValue('asdqwe1234');
    
    const uniqIdTokenGenerator = new UniqIdTokenGenerator();
    const token = uniqIdTokenGenerator.generateToken();

    expect(token).toBe('asdqwe1234');
    expect(token.length).toBeGreaterThanOrEqual(10);
  });
});