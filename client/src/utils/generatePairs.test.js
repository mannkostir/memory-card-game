import generatePairs from './generatePairs';

test('generates an array', () => {
  const arr = generatePairs(new Array(4));
  expect(Array.isArray(arr)).toBe(true);
});

test('has a doubled length', () => {
  const arr = generatePairs(new Array(4));
  expect(arr).toHaveLength(8);
  const arr2 = generatePairs(new Array(2));
  expect(arr2).toHaveLength(4);
});

test('if first argument is undefined uses a default value (empty array)', () => {
  const arr = generatePairs();
  expect(arr).toHaveLength(0);
  expect(Array.isArray(arr)).toBe(true);
});

test('throws an error if called with the argument other than array', () => {
  const invalidValues = [0, -5, 'a', '', 1.5, null, NaN, { 1: 5 }];

  for (let value of invalidValues) {
    expect(() => generatePairs(value)).toThrow();
  }
});
