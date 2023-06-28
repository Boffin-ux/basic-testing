import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    return expect(simpleCalculator({ a: 1, b: 2, action: Action.Add })).toBe(3);
  });

  test('should subtract two numbers', () => {
    return expect(
      simpleCalculator({ a: 10, b: 5, action: Action.Subtract }),
    ).toBe(5);
  });

  test('should multiply two numbers', () => {
    return expect(
      simpleCalculator({ a: 5, b: 5, action: Action.Multiply }),
    ).toBe(25);
  });

  test('should divide two numbers', () => {
    return expect(
      simpleCalculator({ a: 50, b: 10, action: Action.Divide }),
    ).toBe(5);
  });

  test('should exponentiate two numbers', () => {
    return expect(
      simpleCalculator({ a: 4, b: 4, action: Action.Exponentiate }),
    ).toBe(256);
  });

  test('should return null for invalid action', () => {
    return expect(simpleCalculator({ a: 2, b: 3, action: null })).toBe(null);
  });

  test('should return null for invalid arguments', () => {
    return expect(
      simpleCalculator({ a: '4', b: '4', action: Action.Add }),
    ).toBe(null);
  });
});
