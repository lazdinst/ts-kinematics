import { normalizeAndRoundArray } from "./normalizeAndRoundArray";

describe("normalizeAndRoundArray", () => {
  test("normalizes and rounds values in the array to default precision", () => {
    const array = [1.123456789, -0.0000001, 42];
    const result = normalizeAndRoundArray(array);
    const expected = [1.12346, 0, 42];
    expect(result).toEqual(expected);
  });

  test("normalizes and rounds values to a specified precision", () => {
    const array = [1.987654321, -0.123456789];
    const result = normalizeAndRoundArray(array, 3);
    const expected = [1.99, -0.123];
    expect(result).toEqual(expected);
  });

  test("handles an empty array", () => {
    const array: number[] = [];
    const result = normalizeAndRoundArray(array);
    expect(result).toEqual([]);
  });

  test("handles a single element array", () => {
    const array = [1.123456789];
    const result = normalizeAndRoundArray(array);
    const expected = [1.12346];
    expect(result).toEqual(expected);
  });

  test("handles arrays with all zeros", () => {
    const array = [0, -0, 0, -0];
    const result = normalizeAndRoundArray(array);
    const expected = [0, 0, 0, 0];
    expect(result).toEqual(expected);
  });

  test("handles arrays with very small values close to zero", () => {
    const array = [0.0000009, -0.0000009];
    const result = normalizeAndRoundArray(array);
    const expected = [0, 0];
    expect(result).toEqual(expected);
  });

  test("handles arrays with very large values", () => {
    const array = [123456789.987654321, -123456789.987654321];
    const result = normalizeAndRoundArray(array, 11);
    const expected = [123456789.99, -123456789.99];
    expect(result).toEqual(expected);
  });

  test("does not modify the original array", () => {
    const array = [1.123456789, -0.000001, 42];
    const originalArray = [...array];
    normalizeAndRoundArray(array);
    expect(array).toEqual(originalArray);
  });
});
