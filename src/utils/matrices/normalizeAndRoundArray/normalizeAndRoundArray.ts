import { MatrixRow } from "../../../definitions";
import { normalizeAndRoundValue } from "../../math";
/**
 * Normalizes and rounds all values in an array.
 *
 * This function applies normalization (replacing `-0` with `0`) and rounding
 * to each element of a 1D array, returning a new array with the processed values.
 *
 * @param {MatrixRow} array - The array of numeric values to process.
 * @param {number} [precision=6] - The number of decimal places to round to (default is 6).
 * @returns {MatrixRow} - A new array with all values normalized and rounded.
 *
 * Example:
 * const array = [1.123456789, -0.000001, 42];
 * const result = normalizeAndRoundArray(array, 6);
 * console.log(result); // [1.123457, 0, 42]
 */
export function normalizeAndRoundArray(
  array: MatrixRow,
  precision: number = 6
): MatrixRow {
  return array.map((value) => normalizeAndRoundValue(value, precision));
}
