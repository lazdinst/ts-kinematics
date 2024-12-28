import { Matrix } from "../definitions";
import { roundToPrecision as defaultRound } from "./roundToPrecision";

/**
 * Rounds all elements of a matrix using the specified rounding function.
 *
 * @param {Matrix} matrix - The input matrix.
 * @param {(n: number) => number} round - A custom rounding function (default: `defaultRound`).
 * @returns {Matrix} - A new matrix with all elements rounded.
 */
export const roundMatrix = (
  matrix: Matrix,
  round: (n: number) => number = defaultRound
): Matrix => {
  return matrix.map((row) => row.map((col) => round(col)));
};
