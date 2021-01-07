import shuffle from './shuffleArray';

test('throws an error when called with argument other than array', () => {
  expect(shuffle.bind(null, 1)).toThrow();
  expect(shuffle.bind(null, 'a')).toThrow();
  expect(shuffle.bind(null, { 1: 1, 2: 2 })).toThrow();
  expect(shuffle.bind(null, { 1: 2 })).toThrow();
  expect(shuffle.bind(null, true)).toThrow();
  expect(shuffle.bind(null)).toThrow();
  expect(shuffle.bind(null, null)).toThrow();
  expect(shuffle.bind(null, NaN)).toThrow();
});

test('modifies the passed array', () => {
  const arr = [1, 2, 3];
  expect(shuffle(arr)).toBe(arr);
  expect(shuffle(arr)).toEqual(arr);
});
