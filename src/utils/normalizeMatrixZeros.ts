/**
 * Normalizes a matrix by replacing all occurrences of negative zero (-0) with positive zero (0).
 *
 * @param {number[][]} matrix - The input matrix.
 * @returns {number[][]} - A new matrix with normalized zeros.
 */
export const normalizeMatrixZeros = (matrix: number[][]): number[][] => {
  return matrix.map((row) => row.map((col) => (Object.is(col, -0) ? 0 : col)));
};
