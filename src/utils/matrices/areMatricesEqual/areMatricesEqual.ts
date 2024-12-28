import { Matrix } from "../../../definitions";

/**
 * Checks if two matrices are equal.
 *
 * This function determines if two 2D arrays (matrices) are identical in both
 * dimensions and values. Two matrices are considered equal if they have the same
 * number of rows and columns, and each corresponding element matches.
 *
 * @param {Matrix} matrix1 - The first matrix.
 * @param {Matrix} matrix2 - The second matrix.
 * @returns {boolean} - Returns `true` if the matrices are equal, otherwise `false`.
 *
 * Example:
 * const matrixA = [
 *   [1, 2, 3],
 *   [4, 5, 6]
 * ];
 * const matrixB = [
 *   [1, 2, 3],
 *   [4, 5, 6]
 * ];
 * const areEqual = areMatricesEqual(matrixA, matrixB);
 * console.log(areEqual); // true
 */
export const areMatricesEqual = (matrix1: Matrix, matrix2: Matrix): boolean => {
  if (matrix1 == null || matrix2 == null) return false;

  // If sizes are not the same, return early
  if (matrix1.length !== matrix2.length) return false;
  if (matrix1.length > 0 && matrix1[0].length !== matrix2[0]?.length) {
    return false;
  }

  // Compare each element
  for (let row = 0; row < matrix1.length; row++) {
    for (let col = 0; col < matrix1[row].length; col++) {
      if (!Object.is(matrix1[row][col], matrix2[row][col])) {
        return false; // Return as soon as a mismatch is found
      }
    }
  }

  // If all elements match, the matrices are equal
  return true;
};
