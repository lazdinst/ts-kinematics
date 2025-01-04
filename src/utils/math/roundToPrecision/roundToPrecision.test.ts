import { roundToPrecision } from "./roundToPrecision";

describe("roundToPrecision", () => {
  test("rounds to the default precision of 6 significant digits", () => {
    expect(roundToPrecision(1.123456789)).toBe(1.12346); // Rounds to 6 significant digits
  });

  test("rounds to a specified precision of 2 significant digits", () => {
    expect(roundToPrecision(1.987654321, 2)).toBe(2.0); // 2 significant digits
  });

  test("rounds a number with fewer significant digits than the specified precision correctly", () => {
    expect(roundToPrecision(1.2, 3)).toBe(1.2); // Pads to 3 significant digits
  });

  test("handles rounding a whole number with specified precision", () => {
    expect(roundToPrecision(42, 4)).toBe(42.0); // Pads to 4 significant digits
  });

  test("rounds negative numbers correctly", () => {
    expect(roundToPrecision(-1.23456789, 3)).toBe(-1.23); // Rounds to 3 significant digits
  });

  test("handles large numbers with significant digits", () => {
    expect(roundToPrecision(123456789.987654321, 2)).toBe(1.2e8); // 2 significant digits in scientific notation
  });

  test("handles very small numbers (close to zero)", () => {
    expect(roundToPrecision(0.0000123456, 6)).toBe(0); // 6 significant digits
  });

  test("handles very small negative numbers (close to zero)", () => {
    expect(roundToPrecision(-0.0000123456, 6)).toBe(0); // 6 significant digits
  });

  test("handles numbers close to whole numbers", () => {
    expect(roundToPrecision(5.000001, 6)).toBe(5.0); // 6 significant digits
    expect(roundToPrecision(9.500001, 6)).toBe(9.5); // 6 significant digits
  });

  test("does not add unnecessary trailing zeros when precision matches the number of significant digits", () => {
    expect(roundToPrecision(1.1234, 6)).toBe(1.1234); // Already has 6 significant digits
  });

  test("handles NaN values gracefully", () => {
    expect(roundToPrecision(NaN)).toBeNaN();
  });

  test("returns Infinity unchanged for positive infinity", () => {
    expect(roundToPrecision(Infinity)).toBe(Infinity);
  });

  test("returns -Infinity unchanged for negative infinity", () => {
    expect(roundToPrecision(-Infinity)).toBe(-Infinity);
  });

  test("handles rounding negative numbers close to zero", () => {
    const result = roundToPrecision(-0.00000009);
    expect(result).toBe(0); // NormalizeValue converts -0 to 0
    expect(Object.is(result, -0)).toBe(false); // Explicitly confirm it's not -0
  });

  test("rounds numbers with excessive precision without errors", () => {
    expect(roundToPrecision(1.123456789, 20)).toBe(1.123456789); // Up to 20 significant digits
  });
});
