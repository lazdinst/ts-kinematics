import { roundToPrecision as defaultRound } from "./roundToPrecision";

/**
 * Rounds all elements of a matrix using the specified rounding function.
 *
 * @param {number[][]} matrix - The input matrix.
 * @param {(n: number) => number} round - A custom rounding function (default: `defaultRound`).
 * @returns {number[][]} - A new matrix with all elements rounded.
 */
export const roundMatrix = (
  matrix: number[][],
  round: (n: number) => number = defaultRound
): number[][] => {
  return matrix.map((row) => row.map((col) => round(col)));
};
