/**
 * Extracts a subset of a matrix.
 *
 * This function takes a 2D array (matrix) and returns a new 2D array that includes
 * the specified number of rows and columns from the top-left corner of the original matrix.
 *
 * @param {number[][]} m - The original matrix, represented as a 2D array.
 * @param {number} cols - The number of columns to include in the subset.
 * @param {number} rows - The number of rows to include in the subset.
 * @returns {number[][]} - A new 2D array containing the requested subset of the matrix.
 *
 * Example:
 * const matrix = [
 *   [1, 2, 3],
 *   [4, 5, 6],
 *   [7, 8, 9]
 * ];
 * const subset = matrixSubset(matrix, 2, 2);
 * console.log(subset); // [[1, 2], [4, 5]]
 */
export const matrixSubset = (
  m: number[][],
  cols: number,
  rows: number
): number[][] => {
  const subset: number[][] = [];

  // Loop through the required number of rows
  for (let i = 0; i < rows; i++) {
    const rowSubset = m[i].slice(0, cols); // Take the required columns from each row
    subset.push(rowSubset); // Add the row subset to the result
  }

  return subset;
};
