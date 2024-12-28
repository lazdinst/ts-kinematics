/**
 * Normalizes a numeric value by converting negative zero (-0) to positive zero (0).
 *
 * This function ensures that values like `-0` are represented as `0`, which is often
 * useful when working with floating-point operations where `-0` can occur due to precision issues.
 *
 * @param {number} value - The numeric value to normalize.
 * @returns {number} - The normalized value, with `-0` replaced by `0`.
 *
 * Example:
 * normalizeValue(-0); // Returns: 0
 * normalizeValue(5);  // Returns: 5
 */
export function normalizeValue(value: number): number {
  return Object.is(value, -0) ? 0 : value;
}
