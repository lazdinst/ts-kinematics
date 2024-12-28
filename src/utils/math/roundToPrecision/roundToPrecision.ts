/**
 * Rounds a number to a specified number of decimal places.
 *
 * @param {number} value - The number to round.
 * @param {number} decimals - The number of decimal places to round to (default is 6).
 * @returns {number} - The rounded number.
 *
 * Example:
 * roundToPrecision(1.123456789); // Returns: 1.123457
 * roundToPrecision(1.123456789, 2); // Returns: 1.12
 */
export const roundToPrecision = (
  value: number,
  decimals: number = 6
): number => {
  const factor = Math.pow(10, decimals); // 10^decimals
  return Math.round(value * factor) / factor;
};
