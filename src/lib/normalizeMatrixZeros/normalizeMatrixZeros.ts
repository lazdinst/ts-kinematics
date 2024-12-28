import { Matrix } from "../../definitions";
/**
 * Normalizes a matrix by replacing all occurrences of negative zero (-0) with positive zero (0).
 *
 * @param {Matrix} matrix - The input matrix.
 * @returns {Matrix} - A new matrix with normalized zeros.
 */
export const normalizeMatrixZeros = (matrix: Matrix): Matrix => {
  return matrix.map((row) => row.map((col) => (Object.is(col, -0) ? 0 : col)));
};
