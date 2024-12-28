import { normalizeAndRoundValue } from "./normalizeAndRoundValue";

describe("normalizeAndRoundValue", () => {
  test("normalizes and rounds a positive value to default precision", () => {
    const result = normalizeAndRoundValue(1.123456789);
    expect(result).toBe(1.123457);
  });

  test("normalizes and rounds a negative zero to positive zero", () => {
    const result = normalizeAndRoundValue(-0.000001);
    expect(result).toBe(0);
  });

  test("rounds a value to a specified precision", () => {
    const result = normalizeAndRoundValue(1.987654321, 2);
    expect(result).toBe(1.99);
  });

  test("handles zero correctly", () => {
    const result = normalizeAndRoundValue(0);
    expect(result).toBe(0);
  });

  test("handles very small values close to zero", () => {
    const result = normalizeAndRoundValue(0.0000009, 6);
    expect(result).toBe(0);
  });

  test("handles negative very small values close to zero", () => {
    const result = normalizeAndRoundValue(-0.0000009, 6);
    expect(result).toBe(0);
  });

  test("handles very large positive values", () => {
    const result = normalizeAndRoundValue(123456789.987654321, 2);
    expect(result).toBe(123456789.99);
  });

  test("handles very large negative values", () => {
    const result = normalizeAndRoundValue(-123456789.987654321, 2);
    expect(result).toBe(-123456789.99);
  });

  test("does not round unnecessarily when precision is high", () => {
    const result = normalizeAndRoundValue(1.1234, 10);
    expect(result).toBe(1.1234);
  });

  test("rounds to zero decimal places when precision is 0", () => {
    const result = normalizeAndRoundValue(1.987654321, 0);
    expect(result).toBe(2);
  });

  test("handles negative values with specified precision", () => {
    const result = normalizeAndRoundValue(-1.987654321, 3);
    expect(result).toBe(-1.988);
  });

  test("handles extremely large values with high precision", () => {
    const result = normalizeAndRoundValue(987654321.123456789, 8);
    expect(result).toBe(987654321.12345678);
  });

  test("handles extremely small values with high precision", () => {
    const result = normalizeAndRoundValue(0.000000123456, 10);
    expect(result).toBe(0.0000001235);
  });
});
