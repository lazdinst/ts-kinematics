import { Matrix } from "../../../definitions";

/**
 * Extracts a submatrix from the given matrix.
 *
 * This function takes a 2D array (matrix) and returns a new 2D array that includes
 * the specified number of rows and columns from the top-left corner of the original matrix.
 *
 * @param {Matrix} m - The original matrix, represented as a 2D array.
 * @param {number} cols - The number of columns to include in the submatrix.
 * @param {number} rows - The number of rows to include in the submatrix.
 * @returns {Matrix} - A new 2D array containing the requested submatrix.
 *
 * Example:
 * const matrix = [
 *   [1, 2, 3],
 *   [4, 5, 6],
 *   [7, 8, 9]
 * ];
 * const submatrix = subMatrix(matrix, 2, 2);
 * console.log(submatrix); // [[1, 2], [4, 5]]
 */
export const subMatrix = (m: Matrix, cols: number, rows: number): Matrix => {
  const submatrix: Matrix = [];

  // Loop through the required number of rows
  for (let i = 0; i < rows; i++) {
    const rowSubset = m[i].slice(0, cols); // Take the required columns from each row
    submatrix.push(rowSubset); // Add the row subset to the result
  }

  return submatrix;
};
