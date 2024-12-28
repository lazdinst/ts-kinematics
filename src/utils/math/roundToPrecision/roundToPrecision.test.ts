import { roundToPrecision } from "./roundToPrecision";

describe("roundToPrecision", () => {
  test("rounds to the default precision of 6 decimal places", () => {
    expect(roundToPrecision(1.123456789)).toBe(1.123457);
  });

  test("rounds to a specified precision of 2 decimal places", () => {
    expect(roundToPrecision(1.987654321, 2)).toBe(1.99);
  });

  test("rounds a number with fewer decimals than the specified precision correctly", () => {
    expect(roundToPrecision(1.2, 3)).toBe(1.2);
  });

  test("handles rounding a whole number with any precision", () => {
    expect(roundToPrecision(42, 4)).toBe(42);
  });

  test("rounds negative numbers correctly", () => {
    expect(roundToPrecision(-1.23456789, 3)).toBe(-1.235);
  });

  test("rounds whole numbers with no decimals correctly", () => {
    expect(roundToPrecision(100, 2)).toBe(100);
  });

  test("rounds to zero decimal places", () => {
    expect(roundToPrecision(1.987654321, 0)).toBe(2);
  });

  test("handles very small numbers (close to zero)", () => {
    expect(roundToPrecision(0.0000123456, 5)).toBe(0.00001);
  });

  test("handles very large numbers", () => {
    expect(roundToPrecision(123456789.987654321, 2)).toBe(123456789.99);
  });

  test("does not add unnecessary decimals when precision is greater than the number of decimals", () => {
    expect(roundToPrecision(1.1234, 10)).toBe(1.1234);
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
    expect(roundToPrecision(-0.0000009, 6)).toBe(-0); // Should round to -0, later normalized if needed
  });

  test("rounds numbers with excessive precision without errors", () => {
    expect(roundToPrecision(1.123456789, 20)).toBe(1.123456789);
  });
});
