import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 10, b: 5, action: Action.Subtract, expected: 5 },
  { a: 100, b: 99, action: Action.Subtract, expected: 1 },
  { a: 50, b: 40, action: Action.Subtract, expected: 10 },
  { a: 5, b: 5, action: Action.Multiply, expected: 25 },
  { a: 5, b: 10, action: Action.Multiply, expected: 50 },
  { a: 2, b: 7, action: Action.Multiply, expected: 14 },
  { a: 50, b: 10, action: Action.Divide, expected: 5 },
  { a: 100, b: 10, action: Action.Divide, expected: 10 },
  { a: 4, b: 4, action: Action.Exponentiate, expected: 256 },
  { a: 2, b: 2, action: Action.Exponentiate, expected: 4 },
  { a: 8, b: 7, action: Action.Exponentiate, expected: 2097152 },
  { a: 0, b: 2, action: null, expected: null },
  { a: 3, b: 5, action: 'Action', expected: null },
  { a: 6, b: 8, action: [], expected: null },
  { a: '100', b: 7, action: Action.Add, expected: null },
  { a: [], b: 'a', action: Action.Subtract, expected: null },
  { a: {}, b: 0, action: Action.Multiply, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'should perform mathematical operations or return null',
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    },
  );
});
