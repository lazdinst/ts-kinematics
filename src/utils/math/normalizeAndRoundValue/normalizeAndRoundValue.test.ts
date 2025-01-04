import { normalizeAndRoundValue } from "./normalizeAndRoundValue";

describe("normalizeAndRoundValue", () => {
  test("rounds and normalizes positive numbers", () => {
    expect(normalizeAndRoundValue(1.123456789, 6)).toBe(1.12346);
  });

  test("rounds and normalizes negative numbers", () => {
    expect(normalizeAndRoundValue(-1.23456789, 3)).toBe(-1.23);
  });

  test("handles -0 correctly (rounds and normalizes to 0)", () => {
    expect(normalizeAndRoundValue(-0.0000001, 6)).toBe(0);
  });

  test("handles values already normalized", () => {
    expect(normalizeAndRoundValue(42, 2)).toBe(42);
  });

  test("handles NaN gracefully", () => {
    expect(normalizeAndRoundValue(NaN, 6)).toBeNaN();
  });

  test("handles Infinity and -Infinity without modification", () => {
    expect(normalizeAndRoundValue(Infinity, 6)).toBe(Infinity);
    expect(normalizeAndRoundValue(-Infinity, 6)).toBe(-Infinity);
  });
});
