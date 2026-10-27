import { TokenGuard } from './token.guard.js';

describe('TokenGuard', () => {
  it('should be defined', () => {
    expect(new TokenGuard()).toBeDefined();
  });
});
