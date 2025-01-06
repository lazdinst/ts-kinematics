// Deprecated: This function is deprecated and will be removed in the next major version.
// rountToPrecision already normalizes the value, so there is no need to call normalizeAndRoundValue.

import { normalizeValue } from "../normalizeValue";
import { roundToPrecision } from "../roundToPrecision";

/**
 * Normalizes and rounds a numeric value.
 *
 * This function first rounds the input value to a specified precision
 * and then normalizes it by replacing negative zero (-0) with positive zero (0).
 *
 * @param {number} n - The numeric value to process.
 * @param {number} [precision=6] - The number of decimal places to round to (default is 6).
 * @returns {number} - The processed value, rounded and normalized.
 *
 * Example:
 * normalizeAndRoundValue(-0.000001); // Returns: 0
 * normalizeAndRoundValue(1.123456789, 4); // Returns: 1.1235
 */
export function normalizeAndRoundValue(
  n: number,
  precision: number = 6
): number {
  return normalizeValue(roundToPrecision(n, precision));
}
