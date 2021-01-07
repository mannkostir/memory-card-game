import isPositiveInteger from './isPositiveInteger';

test('returned value is a positive integer', () => {
  expect(isPositiveInteger(0)).toBe(false);
  expect(isPositiveInteger(-5)).toBe(false);
  expect(isPositiveInteger('1')).toBe(false);
  expect(isPositiveInteger('a')).toBe(false);
  expect(isPositiveInteger()).toBe(false);
  expect(isPositiveInteger(1.5)).toBe(false);
  expect(isPositiveInteger(null)).toBe(false);
  expect(isPositiveInteger(NaN)).toBe(false);
  expect(isPositiveInteger(undefined)).toBe(false);
  expect(isPositiveInteger({ '1': 5 })).toBe(false);
  expect(isPositiveInteger([1, 3])).toBe(false);
  expect(isPositiveInteger(1)).toBe(true);
});
