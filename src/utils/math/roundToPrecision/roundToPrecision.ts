import { normalizeValue } from "../normalizeValue";

/**
 * Rounds a number to a specified number of decimal places.
 *
 * @param {number} value - The number to round.
 * @param {number} precision - The number of significant digits (default is 6).
 * @returns {number} - The rounded and normalized number.
 *
 * Example:
 * roundToPrecision(1.123456789); // Returns: 1.123457
 * roundToPrecision(1.123456789, 2); // Returns: 1.12
 */
export const roundToPrecision = (
  value: number,
  precision: number = 6
): number => {
  const epsilon = Math.pow(10, -3); // Threshold aligned with precision
  if (Math.abs(value) < epsilon) {
    return 0; // Treat very small numbers as zero
  }

  if (value === 0) return 0; // Special case for zero
  const rounded = parseFloat(value.toPrecision(precision));

  return normalizeValue(rounded);
};

// Test cases
// npx nodemon --watch src/utils/math/roundToPrecision -e ts --exec "npx ts-node" src/utils/math/roundToPrecision/roundToPrecision.ts
// const testValues = [
//   { value: 5.000001, precision: 6 },
//   { value: 9.500001, precision: 6 },
//   { value: 1.123456789, precision: 6 },
//   { value: 1.987654321, precision: 2 },
//   { value: -1.23456789, precision: 3 },
// ];

// console.log("Testing roundToPrecision:");
// testValues.forEach(({ value, precision }) => {
//   const result = roundToPrecision(value, precision);
//   console.log(`roundToPrecision(${value}, ${precision}) = ${result}`);
// });
