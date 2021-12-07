import { FinderError } from '../error';

describe('[Unit] FinderError', () => {
  it('Class should be initiated', () => {
    const error = new FinderError('error');
    expect(error).toBeInstanceOf(FinderError);
    expect(error.message).toBe('error');
    expect(error.name).toBe('Finder');
  });
});
