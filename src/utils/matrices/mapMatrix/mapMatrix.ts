/**
 * Applies a callback function to each element of a matrix.
 *
 * This function takes a 2D array (matrix) and applies the provided callback function
 * to every element, returning a new matrix with the transformed values.
 *
 * @param {number[][]} matrix - The matrix to transform.
 * @param {(value: number) => number} callback - A function to apply to each element of the matrix.
 * @returns {number[][]} - A new matrix with the transformed values.
 *
 * Example:
 * const matrix = [
 *   [1.123456789, -0.000001],
 *   [42, 0.987654321]
 * ];
 * const result = mapMatrix(matrix, (value) => normalizeAndRoundValue(value, 6));
 * console.log(result); // [[1.123457, 0], [42, 0.987654]]
 */
export function mapMatrix(
  matrix: number[][],
  callback: (value: number) => number
): number[][] {
  return matrix.map((row) => row.map(callback));
}
