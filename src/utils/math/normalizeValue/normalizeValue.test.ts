import { normalizeValue } from "./normalizeValue";

describe("normalizeValue", () => {
  test("converts -0 to 0", () => {
    expect(normalizeValue(-0)).toBe(0);
  });

  test("does not alter positive numbers", () => {
    expect(normalizeValue(5)).toBe(5);
    expect(normalizeValue(123.456)).toBe(123.456);
  });

  test("does not alter negative numbers other than -0", () => {
    expect(normalizeValue(-5)).toBe(-5);
    expect(normalizeValue(-123.456)).toBe(-123.456);
  });

  test("does not alter 0 (positive zero)", () => {
    expect(normalizeValue(0)).toBe(0);
  });

  test("handles edge cases like NaN", () => {
    expect(normalizeValue(NaN)).toBeNaN();
  });

  test("handles infinity values", () => {
    expect(normalizeValue(Infinity)).toBe(Infinity);
    expect(normalizeValue(-Infinity)).toBe(-Infinity);
  });
});
