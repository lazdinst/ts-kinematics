import { roundToPrecision as defaultRound } from "./roundToPrecision";

/**
 * Normalizes and rounds all elements of a matrix.
 *
 * This function first applies a rounding function to each element, then replaces
 * all occurrences of negative zero (-0) with positive zero (0).
 *
 * @param {number[][]} matrix - The input matrix.
 * @param {(n: number) => number} round - A custom rounding function (default: `defaultRound`).
 * @returns {number[][]} - A new matrix with all elements normalized and rounded.
 */
export const normalizeAndRoundMatrix = (
  matrix: number[][],
  round: (n: number) => number = defaultRound
): number[][] => {
  return matrix.map((row) =>
    row.map((value) => {
      let rounded = round(value);
      return Object.is(rounded, -0) ? 0 : rounded;
    })
  );
};
