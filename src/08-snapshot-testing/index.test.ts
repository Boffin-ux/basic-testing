import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  const elements = [1, 2, 3, 4];
  const linkedList = {
    value: 1,
    next: {
      value: 2,
      next: { value: 3, next: { value: 4, next: { value: null, next: null } } },
    },
  };
  const result = generateLinkedList(elements);

  test('should generate linked list from values 1', () => {
    expect(result).toStrictEqual(linkedList);
  });

  test('should generate linked list from values 2', () => {
    expect(result).toMatchSnapshot();
  });
});
