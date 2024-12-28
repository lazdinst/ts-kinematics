import { normalizeValue } from "./normalizeValue";

describe("normalizeValue", () => {
  test("converts -0 to 0", () => {
    const result = normalizeValue(-0);
    expect(result).toBe(0);
    expect(Object.is(result, 0)).toBe(true); // Ensure positive zero
  });

  test("does not alter positive numbers", () => {
    expect(normalizeValue(5)).toBe(5);
    expect(normalizeValue(123.456)).toBe(123.456);
    expect(normalizeValue(0.0000001)).toBe(0.0000001);
    expect(normalizeValue(987654321)).toBe(987654321);
  });

  test("does not alter negative numbers other than -0", () => {
    expect(normalizeValue(-5)).toBe(-5);
    expect(normalizeValue(-123.456)).toBe(-123.456);
    expect(normalizeValue(-0.0000001)).toBe(-0.0000001);
    expect(normalizeValue(-987654321)).toBe(-987654321);
  });

  test("does not alter 0 (positive zero)", () => {
    const result = normalizeValue(0);
    expect(result).toBe(0);
    expect(Object.is(result, 0)).toBe(true); // Ensure it remains positive zero
  });

  test("handles very small values close to zero", () => {
    expect(normalizeValue(0.0000001)).toBe(0.0000001);
    expect(normalizeValue(-0.0000001)).toBe(-0.0000001);
  });

  test("handles very large values", () => {
    expect(normalizeValue(1e10)).toBe(1e10);
    expect(normalizeValue(-1e10)).toBe(-1e10);
  });

  test("handles edge cases like NaN", () => {
    const result = normalizeValue(NaN);
    expect(result).toBeNaN();
    expect(Object.is(result, NaN)).toBe(true); // Ensure it remains NaN
  });

  test("handles positive infinity", () => {
    const result = normalizeValue(Infinity);
    expect(result).toBe(Infinity);
    expect(Object.is(result, Infinity)).toBe(true); // Ensure it remains positive infinity
  });

  test("handles negative infinity", () => {
    const result = normalizeValue(-Infinity);
    expect(result).toBe(-Infinity);
    expect(Object.is(result, -Infinity)).toBe(true); // Ensure it remains negative infinity
  });
});
