/**
 * Rounds a number to a specified precision.
 *
 * @param {number} value - The number to round.
 * @param {number} precision - The precision for rounding (default is 1,000,000).
 * @returns {number} - The rounded number.
 */
export const roundToPrecision = (
  value: number,
  precision: number = 1000000
): number => {
  return Math.round(value * precision) / precision;
};
