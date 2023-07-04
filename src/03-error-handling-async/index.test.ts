import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const str = 'Test';
    const data = await resolveValue(str);
    expect(data).toBe(str);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const err = 'Custom Error';
    return expect(() => throwError(err)).toThrow(err);
  });

  test('should throw error with default message if message is not provided', () => {
    return expect(() => throwError()).toThrow();
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    return expect(() => throwCustomError()).toThrow(new MyAwesomeError());
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    return await expect(rejectCustomError()).rejects.toThrow(
      new MyAwesomeError(),
    );
  });
});
